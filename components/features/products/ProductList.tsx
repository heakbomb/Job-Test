'use client'

import { useProducts } from '@/hooks/useProducts'
import { PRODUCT_FILTERS } from '@/constants'
import ProductCard from './ProductCard'

export default function ProductList() {
  const { products, filter, setFilter, search, setSearch } = useProducts()

  return (
    <div className="w-[1280px] mx-auto flex flex-col gap-[42px] py-[50px]">
      <div className="flex items-center justify-end gap-[16px] h-[26px]">
        <div className="flex items-center gap-[8px] w-[250px] h-[26px] px-[12px] border border-[#E9EAEC] rounded-sm">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M9 17A8 8 0 109 1a8 8 0 000 16zM19 19l-4.35-4.35" stroke="#979CA5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <input
            type="text"
            placeholder="검색"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 text-[16px] font-semibold text-[#1C1E21] outline-none placeholder:text-[#979CA5] bg-transparent"
          />
          {search && (
            <button onClick={() => setSearch('')} aria-label="검색 초기화">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M12 4L4 12M4 4l8 8" stroke="#979CA5" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          )}
        </div>

        <div className="flex items-center gap-[8px]">
          {PRODUCT_FILTERS.map((f, i) => (
            <span key={f} className="flex items-center gap-[8px]">
              {i > 0 && <span className="text-[16px] font-semibold text-[#979CA5]">|</span>}
              <button
                onClick={() => setFilter(f)}
                className="text-[16px] font-semibold"
                style={{ color: filter === f ? '#1C1E21' : '#979CA5' }}
              >
                {f}
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className="border-t border-[#E9EAEC]" />

      <div className="flex flex-col gap-[30px]">
        {[0, 1, 2].map((rowIdx) => (
          <div key={rowIdx} className="flex gap-[26px]">
            {products.slice(rowIdx * 4, rowIdx * 4 + 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
