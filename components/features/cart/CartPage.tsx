'use client'

import Link from 'next/link'
import { useCart } from '@/contexts/CartContext'

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalAmount } = useCart()

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-[32px]">
        <div className="flex flex-col items-center gap-[12px]">
          <p className="text-[18px] font-semibold text-ink">장바구니가 비어있습니다</p>
          <p className="text-[14px] text-muted">마음에 드는 상품을 담아보세요.</p>
        </div>
        <Link
          href="/products"
          className="h-[48px] px-[32px] bg-brand text-white text-[16px] font-semibold rounded-sm flex items-center hover:opacity-90 transition-opacity"
        >
          쇼핑 계속하기
        </Link>
      </div>
    )
  }

  return (
    <div className="w-[1280px] mx-auto py-[60px] flex flex-col gap-[40px]">
      <h1 className="text-[24px] font-bold text-ink">장바구니</h1>

      <div className="flex gap-[40px] items-start">
        {/* 상품 목록 */}
        <div className="flex-1 border-t border-line">
          {items.map(({ product, quantity }) => (
            <div
              key={product.id}
              className="flex items-center gap-[20px] py-[24px] border-b border-line"
            >
              <div className="w-[80px] h-[100px] bg-line shrink-0">
                {product.image_url && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={product.image_url}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              <div className="flex-1 flex flex-col gap-[6px]">
                <span className="text-[13px] text-muted">{product.type}</span>
                <p className="text-[15px] font-semibold text-ink">{product.title}</p>
                <p className="text-[14px] text-ink">
                  {product.price ? product.price.toLocaleString() + '원' : '가격 문의'}
                </p>
              </div>

              {/* 수량 조절 */}
              <div className="flex items-center gap-[8px]">
                <button
                  onClick={() => updateQuantity(product.id, quantity - 1)}
                  className="w-[28px] h-[28px] border border-line rounded-sm flex items-center justify-center text-ink hover:border-brand hover:text-brand transition-colors"
                >
                  −
                </button>
                <span className="w-[32px] text-center text-[15px] font-semibold text-ink">
                  {quantity}
                </span>
                <button
                  onClick={() => updateQuantity(product.id, quantity + 1)}
                  className="w-[28px] h-[28px] border border-line rounded-sm flex items-center justify-center text-ink hover:border-brand hover:text-brand transition-colors"
                >
                  +
                </button>
              </div>

              {/* 소계 */}
              <p className="w-[110px] text-right text-[15px] font-semibold text-ink">
                {product.price
                  ? (product.price * quantity).toLocaleString() + '원'
                  : '-'}
              </p>

              {/* 삭제 */}
              <button
                onClick={() => removeItem(product.id)}
                className="text-muted hover:text-ink transition-colors"
                aria-label="삭제"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M12 4L4 12M4 4l8 8"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>

        {/* 주문 요약 */}
        <div className="w-[300px] border border-line rounded-sm p-[24px] flex flex-col gap-[20px] shrink-0">
          <h2 className="text-[16px] font-bold text-ink">주문 요약</h2>

          <div className="flex flex-col gap-[10px]">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="flex justify-between text-[13px]">
                <span className="text-muted truncate flex-1 mr-[8px]">
                  {product.title} × {quantity}
                </span>
                <span className="text-ink shrink-0">
                  {product.price
                    ? (product.price * quantity).toLocaleString() + '원'
                    : '-'}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-line pt-[16px] flex justify-between">
            <span className="text-[16px] font-bold text-ink">합계</span>
            <span className="text-[16px] font-bold text-brand">
              {totalAmount.toLocaleString()}원
            </span>
          </div>

          <Link
            href="/checkout"
            className="w-full h-[48px] bg-brand text-white text-[16px] font-semibold rounded-sm flex items-center justify-center hover:opacity-90 transition-opacity"
          >
            주문하기
          </Link>
        </div>
      </div>
    </div>
  )
}
