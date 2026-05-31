'use client'

import { Product } from '@/types'
import { useCart } from '@/contexts/CartContext'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()

  return (
    <div className="w-[250px] bg-white flex flex-col group">
      <div className="w-[250px] h-[320px] bg-line relative overflow-hidden">
        {product.image_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.image_url}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        )}
        <button
          onClick={() => addItem(product)}
          className="absolute bottom-0 left-0 right-0 h-[44px] bg-brand/90 text-white text-[13px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
        >
          장바구니 담기
        </button>
      </div>

      <div className="flex flex-col gap-[6px] pt-[12px]">
        <span className="text-[16px] font-semibold text-muted">{product.type}</span>
        <p className="text-[16px] font-semibold text-ink leading-snug">{product.title}</p>
        {product.price !== undefined && (
          <p className="text-[14px] font-medium text-ink">
            {product.price.toLocaleString()}원
          </p>
        )}
      </div>
    </div>
  )
}
