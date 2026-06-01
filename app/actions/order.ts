'use server'

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { salePrice } from '@/lib/utils'

type OrderState = { error: string } | { orderId: string } | null

interface CartItemInput {
  productId: string
  quantity: number
}

// DB 전용 클라이언트 — service_role key로 RLS 우회 (서버에서만 사용)
async function createDbClient() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: { getAll: () => [], setAll: () => {} },
    }
  )
}

// 인증 전용 클라이언트 — user_id 조회용
async function createAuthClient() {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: () => {},
      },
    }
  )
}

export async function createOrderAction(
  prevState: OrderState,
  formData: FormData
): Promise<OrderState> {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const phone = formData.get('phone') as string
  const recipient_name = formData.get('recipient_name') as string
  const recipient_phone = formData.get('recipient_phone') as string
  const zipcode = formData.get('zipcode') as string
  const address = formData.get('address') as string
  const address_detail = formData.get('address_detail') as string
  const payment_method = formData.get('payment_method') as string
  const itemsJson = formData.get('items') as string

  if (!email) return { error: '이메일을 입력해 주세요.' }
  if (!recipient_phone) return { error: '수령인 연락처를 입력해 주세요.' }
  if (!address) return { error: '배송 주소를 입력해 주세요.' }

  let items: CartItemInput[]
  try {
    items = JSON.parse(itemsJson)
  } catch {
    return { error: '장바구니 정보가 올바르지 않습니다.' }
  }

  if (!items.length) return { error: '장바구니가 비어있습니다.' }

  const db = await createDbClient()

  // DB에서 가격 재확인 (클라이언트 값 신뢰 안 함)
  const productIds = items.map((i) => i.productId)
  const { data: products, error: productError } = await db
    .from('products')
    .select('id, price, discount_rate, shipping_fee')
    .in('id', productIds)

  if (productError || !products) return { error: '상품 정보를 확인할 수 없습니다.' }

  const priceMap = Object.fromEntries(
    products.map((p) => [p.id, salePrice(p.price ?? 0, p.discount_rate ?? 0)])
  )
  const shippingMap = Object.fromEntries(
    products.map((p) => [p.id, p.shipping_fee ?? 0])
  )

  const subtotal = items.reduce(
    (sum, item) => sum + (priceMap[item.productId] ?? 0) * item.quantity,
    0
  )
  const totalShipping = items.reduce(
    (sum, item) => sum + (shippingMap[item.productId] ?? 0),
    0
  )
  const totalAmount = subtotal + totalShipping

  // 인증 클라이언트로 user_id만 별도 조회
  const authClient = await createAuthClient()
  const { data: { user } } = await authClient.auth.getUser()

  const { data: order, error: orderError } = await db
    .from('orders')
    .insert({
      user_id: user?.id ?? null,
      email,
      name: name || null,
      phone: phone || null,
      recipient_name: recipient_name || null,
      recipient_phone,
      zipcode: zipcode || null,
      address,
      address_detail: address_detail || null,
      payment_method: payment_method || '카드',
      shipping_fee: totalShipping,
      status: '주문완료',
      total_amount: totalAmount,
    })
    .select('id')
    .single()

  if (orderError || !order) {
    console.error('[order] insert error:', JSON.stringify(orderError))
    return { error: '주문 생성에 실패했습니다.' }
  }

  const { error: itemsError } = await db.from('order_items').insert(
    items.map((item) => ({
      order_id: order.id,
      product_id: item.productId,
      quantity: item.quantity,
      unit_price: priceMap[item.productId] ?? 0,
    }))
  )

  if (itemsError) return { error: '주문 항목 저장에 실패했습니다.' }

  return { orderId: order.id }
}
