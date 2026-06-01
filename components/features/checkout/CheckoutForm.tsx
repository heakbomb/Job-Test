'use client'

import { useActionState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useCart } from '@/contexts/CartContext'
import { createOrderAction } from '@/app/actions/order'
import { salePrice } from '@/lib/utils'

export default function CheckoutForm() {
  const router = useRouter()
  const { items, totalAmount, totalShipping, clearCart } = useCart()
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

  const grandTotal = totalAmount + totalShipping
  const itemsJson = JSON.stringify(
    items.map((i) => ({ productId: i.product.id, quantity: i.quantity }))
  )

  const inputClass =
    'w-full h-[48px] px-[16px] border border-line rounded-sm text-[14px] text-ink placeholder:text-muted outline-none focus:border-brand transition-colors'

  return (
    <div className="w-[1280px] mx-auto py-[60px] flex gap-[60px] items-start">
      {/* 폼 */}
      <form action={action} className="flex-1 flex flex-col gap-[32px]">
        <input type="hidden" name="items" value={itemsJson} />

        <h1 className="text-[24px] font-bold text-ink">주문 / 결제</h1>

        {state && 'error' in state && (
          <p className="text-[14px] text-red-500 bg-red-50 px-[16px] py-[12px] rounded-sm">
            {state.error}
          </p>
        )}

        {/* 주문자 정보 */}
        <div className="flex flex-col gap-[12px]">
          <h2 className="text-[16px] font-semibold text-ink">주문자 정보</h2>
          <input name="name" type="text" placeholder="이름" className={inputClass} />
          <input name="email" type="email" placeholder="이메일 (필수)" required className={inputClass} />
          <input name="phone" type="tel" placeholder="연락처" className={inputClass} />
        </div>

        {/* 배송 정보 */}
        <div className="flex flex-col gap-[12px]">
          <h2 className="text-[16px] font-semibold text-ink">배송 정보</h2>
          <input name="recipient_name" type="text" placeholder="수령인" className={inputClass} />
          <input
            name="recipient_phone"
            type="tel"
            placeholder="수령인 연락처 (필수)"
            required
            className={inputClass}
          />
          <div className="flex gap-[8px]">
            <input
              name="zipcode"
              type="text"
              placeholder="우편번호"
              className="w-[160px] h-[48px] px-[16px] border border-line rounded-sm text-[14px] text-ink placeholder:text-muted outline-none focus:border-brand transition-colors"
            />
            <button
              type="button"
              className="h-[48px] px-[16px] border border-line rounded-sm text-[14px] text-muted hover:border-brand hover:text-brand transition-colors"
            >
              주소 찾기
            </button>
          </div>
          <input
            name="address"
            type="text"
            placeholder="주소 (필수)"
            required
            className={inputClass}
          />
          <input
            name="address_detail"
            type="text"
            placeholder="상세주소"
            className={inputClass}
          />
        </div>

        {/* 결제 수단 */}
        <div className="flex flex-col gap-[12px]">
          <h2 className="text-[16px] font-semibold text-ink">결제 수단</h2>
          <div className="flex gap-[16px]">
            {(['카드', '무통장입금'] as const).map((method) => (
              <label
                key={method}
                className="flex items-center gap-[8px] cursor-pointer text-[14px] text-ink"
              >
                <input
                  type="radio"
                  name="payment_method"
                  value={method}
                  defaultChecked={method === '카드'}
                  className="accent-brand"
                />
                {method}
              </label>
            ))}
          </div>
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
          {items.map(({ product, quantity }) => {
            const sp = salePrice(product.price ?? 0, product.discount_rate)
            return (
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
                  <p className="text-[13px] font-semibold text-ink leading-snug">{product.title}</p>
                  <p className="text-[13px] text-ink">
                    {(sp * quantity).toLocaleString()}원
                    {quantity > 1 && (
                      <span className="text-muted ml-[4px]">× {quantity}</span>
                    )}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="flex flex-col gap-[8px] border-t border-line pt-[16px]">
          <div className="flex justify-between text-[13px]">
            <span className="text-muted">상품금액</span>
            <span className="text-ink">{totalAmount.toLocaleString()}원</span>
          </div>
          <div className="flex justify-between text-[13px]">
            <span className="text-muted">배송비</span>
            <span className="text-ink">
              {totalShipping === 0 ? '무료' : `${totalShipping.toLocaleString()}원`}
            </span>
          </div>
        </div>

        <div className="border-t border-line pt-[16px] flex justify-between">
          <span className="text-[16px] font-bold text-ink">합계</span>
          <span className="text-[16px] font-bold text-brand">
            {grandTotal.toLocaleString()}원
          </span>
        </div>
      </div>
    </div>
  )
}
