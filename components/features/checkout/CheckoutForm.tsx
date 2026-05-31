'use client'

import { useActionState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useCart } from '@/contexts/CartContext'
import { createOrderAction } from '@/app/actions/order'

export default function CheckoutForm() {
  const router = useRouter()
  const { items, totalAmount, clearCart } = useCart()
  const [state, action, pending] = useActionState(createOrderAction, null)

  useEffect(() => {
    if (state && 'orderId' in state) {
      clearCart()
      router.push(`/order-complete/${state.orderId}`)
    }
  }, [state]) // eslint-disable-line react-hooks/exhaustive-deps

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-[20px]">
        <p className="text-[16px] text-muted">장바구니가 비어있습니다.</p>
        <Link href="/products" className="text-brand font-semibold text-[14px]">
          쇼핑 계속하기
        </Link>
      </div>
    )
  }

  const itemsJson = JSON.stringify(
    items.map((i) => ({ productId: i.product.id, quantity: i.quantity }))
  )

  return (
    <div className="w-[1280px] mx-auto py-[60px] flex gap-[60px] items-start">
      {/* 주문자 정보 폼 */}
      <form action={action} className="flex-1 flex flex-col gap-[32px]">
        <input type="hidden" name="items" value={itemsJson} />

        <h1 className="text-[24px] font-bold text-ink">주문 / 결제</h1>

        {state && 'error' in state && (
          <p className="text-[14px] text-red-500 bg-red-50 px-[16px] py-[12px] rounded-sm">
            {state.error}
          </p>
        )}

        <div className="flex flex-col gap-[16px]">
          <h2 className="text-[16px] font-semibold text-ink">주문자 정보</h2>
          <input
            name="name"
            type="text"
            placeholder="이름"
            className="w-full h-[48px] px-[16px] border border-line rounded-sm text-[14px] text-ink placeholder:text-muted outline-none focus:border-brand transition-colors"
          />
          <input
            name="email"
            type="email"
            placeholder="이메일 (필수)"
            required
            className="w-full h-[48px] px-[16px] border border-line rounded-sm text-[14px] text-ink placeholder:text-muted outline-none focus:border-brand transition-colors"
          />
          <input
            name="phone"
            type="tel"
            placeholder="연락처"
            className="w-full h-[48px] px-[16px] border border-line rounded-sm text-[14px] text-ink placeholder:text-muted outline-none focus:border-brand transition-colors"
          />
        </div>

        <button
          type="submit"
          disabled={pending}
          className="w-full h-[52px] bg-brand text-white text-[16px] font-semibold rounded-sm disabled:opacity-50 hover:opacity-90 transition-opacity"
        >
          {pending ? '주문 처리 중...' : '주문 완료하기'}
        </button>
      </form>

      {/* 주문 상품 요약 */}
      <div className="w-[340px] border border-line rounded-sm p-[24px] flex flex-col gap-[20px] shrink-0">
        <h2 className="text-[16px] font-bold text-ink">주문 상품</h2>

        <div className="flex flex-col gap-[16px]">
          {items.map(({ product, quantity }) => (
            <div key={product.id} className="flex gap-[12px]">
              <div className="w-[56px] h-[72px] bg-line shrink-0">
                {product.image_url && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={product.image_url}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="flex flex-col gap-[4px] flex-1">
                <span className="text-[12px] text-muted">{product.type}</span>
                <p className="text-[13px] font-semibold text-ink leading-snug">
                  {product.title}
                </p>
                <p className="text-[13px] text-ink">
                  {product.price
                    ? (product.price * quantity).toLocaleString() + '원'
                    : '-'}
                  {quantity > 1 && (
                    <span className="text-muted ml-[4px]">× {quantity}</span>
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-line pt-[16px] flex justify-between">
          <span className="text-[16px] font-bold text-ink">합계</span>
          <span className="text-[16px] font-bold text-brand">
            {totalAmount.toLocaleString()}원
          </span>
        </div>
      </div>
    </div>
  )
}
