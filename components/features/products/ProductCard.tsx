'use client'

import Link from 'next/link'
import { Product } from '@/types'
import { salePrice } from '@/lib/utils'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const finalPrice = salePrice(product.price ?? 0, product.discount_rate)

  return (
    <Link href={`/products/${product.id}`} className="w-[250px] bg-white flex flex-col">
      <div className="w-[250px] h-[320px] bg-white overflow-hidden border border-line">
        {product.image_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.image_url}
            alt={product.title}
            className="w-full h-full object-contain"
          />
        )}
      </div>

      <div className="flex flex-col gap-[6px] pt-[12px]">
        <span className="text-[16px] font-semibold text-muted">{product.type}</span>
        <p className="text-[16px] font-semibold text-ink leading-snug">{product.title}</p>
        {product.price !== undefined && (
          <div className="flex flex-col gap-[2px]">
            {product.discount_rate > 0 && (
              <p className="text-[13px] text-muted line-through">
                {product.price.toLocaleString()}원
              </p>
            )}
            <div className="flex items-center gap-[6px]">
              {product.discount_rate > 0 && (
                <span className="text-[13px] font-bold text-sale">
                  {product.discount_rate}%
                </span>
              )}
              <p className="text-[14px] font-medium text-ink">
                {finalPrice.toLocaleString()}원
              </p>
            </div>
          </div>
        )}
      </div>
    </Link>
  )
}
