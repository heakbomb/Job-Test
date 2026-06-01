'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Product } from '@/types'
import { useCart } from '@/contexts/CartContext'
import { salePrice } from '@/lib/utils'

export default function ProductDetail({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCart()
  const router = useRouter()

  const finalPrice = salePrice(product.price ?? 0, product.discount_rate)

  const handleAddToCart = () => {
    addItem(product, quantity)
    router.push('/cart')
  }

  const handleBuyNow = () => {
    addItem(product, quantity)
    router.push('/checkout')
  }

  return (
    <div className="w-[1280px] mx-auto py-[60px] flex flex-col gap-[40px]">
      <Link
        href="/products"
        className="flex items-center gap-[6px] text-[14px] text-muted hover:text-ink transition-colors w-fit"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        상품 목록
      </Link>

      <div className="flex gap-[60px]">
        {/* 이미지 */}
        <div className="w-[480px] h-[600px] bg-line shrink-0">
          {product.image_url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.image_url}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          )}
        </div>

        {/* 정보 */}
        <div className="flex-1 flex flex-col gap-[24px] pt-[8px]">
          <div className="flex flex-col gap-[8px]">
            <span className="text-[14px] text-muted">{product.type}</span>
            <h1 className="text-[24px] font-bold text-ink leading-snug">{product.title}</h1>
          </div>

          {/* 가격 */}
          {product.price !== undefined && (
            <div className="flex flex-col gap-[4px]">
              {product.discount_rate > 0 && (
                <div className="flex items-center gap-[8px]">
                  <span className="text-[14px] font-bold text-sale">{product.discount_rate}%</span>
                  <span className="text-[14px] text-muted line-through">
                    {product.price.toLocaleString()}원
                  </span>
                </div>
              )}
              <p className="text-[28px] font-bold text-ink">{finalPrice.toLocaleString()}원</p>
            </div>
          )}

          <div className="border-t border-line" />

          {/* 배송 */}
          <div className="flex gap-[16px] text-[14px]">
            <span className="text-muted w-[60px] shrink-0">배송</span>
            <span className="text-ink">
              {(product.shipping_fee ?? 0) === 0
                ? '무료'
                : `${(product.shipping_fee ?? 0).toLocaleString()}원`}
            </span>
          </div>

          <div className="border-t border-line" />

          {/* 수량 */}
          <div className="flex items-center gap-[16px]">
            <span className="text-[14px] text-muted w-[60px] shrink-0">수량</span>
            <div className="flex items-center gap-[8px]">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-[32px] h-[32px] border border-line rounded-sm flex items-center justify-center text-ink hover:border-brand hover:text-brand transition-colors"
              >
                −
              </button>
              <span className="w-[40px] text-center text-[16px] font-semibold text-ink">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="w-[32px] h-[32px] border border-line rounded-sm flex items-center justify-center text-ink hover:border-brand hover:text-brand transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* 합계 */}
          <div className="flex items-center justify-between py-[16px] border-t border-b border-line">
            <span className="text-[14px] text-muted">합계</span>
            <span className="text-[22px] font-bold text-ink">
              {(finalPrice * quantity).toLocaleString()}원
            </span>
          </div>

          {/* 버튼 */}
          <div className="flex gap-[12px]">
            <button
              onClick={handleAddToCart}
              className="flex-1 h-[52px] border border-brand text-brand text-[16px] font-semibold rounded-sm hover:bg-brand/5 transition-colors"
            >
              장바구니 담기
            </button>
            <button
              onClick={handleBuyNow}
              className="flex-1 h-[52px] bg-brand text-white text-[16px] font-semibold rounded-sm hover:opacity-90 transition-opacity"
            >
              바로 구매
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
