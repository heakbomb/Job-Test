import { Product } from '@/types'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="w-[250px] bg-white flex flex-col">
      <div className="w-[250px] h-[320px] bg-line">
        {product.image_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.image_url}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        )}
      </div>

      <div className="flex flex-col gap-[6px] pt-[12px]">
        <span className="text-[16px] font-semibold text-muted">
          {product.type}
        </span>
        <p className="text-[16px] font-semibold text-ink leading-snug">
          {product.title}
        </p>
        {product.price !== undefined && (
          <p className="text-[14px] font-medium text-ink">
            {product.price.toLocaleString()}원
          </p>
        )}
      </div>
    </div>
  )
}
