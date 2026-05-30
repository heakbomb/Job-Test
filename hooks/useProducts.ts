'use client'

import { useState, useMemo } from 'react'
import { Product, ProductType } from '@/types'
import { PRODUCT_FILTERS } from '@/constants'

const MOCK_PRODUCTS: Product[] = [
  { id: '1', title: '2026 Hidden Kice 시즌7', type: '단품', image_url: '/sol.png' },
  { id: '2', title: '2026 Hidden Kice 시즌7', type: '패스', price: 76000, image_url: '/pass.png' },
  { id: '3', title: '2026 Hidden Kice 시즌7', type: '패스', price: 76000, image_url: '/pass.png' },
  { id: '4', title: '2026 Hidden Kice 시즌7', type: '패스', price: 76000, image_url: '/pass.png' },
  { id: '5', title: '2026 Hidden Kice 시즌7', type: '패스', price: 76000, image_url: '/pass.png' },
  { id: '6', title: '2026 Hidden Kice 시즌7', type: '패스', price: 76000, image_url: '/pass.png' },
  { id: '7', title: '2026 Hidden Kice 시즌7', type: '단품', image_url: '/sol.png' },
  { id: '8', title: '2026 Hidden Kice 시즌7', type: '패스', price: 76000, image_url: '/pass.png' },
  { id: '9', title: '2026 Hidden Kice 시즌7', type: '단품', image_url: '/sol.png' },
  { id: '10', title: '2026 Hidden Kice 시즌7', type: '패스', price: 76000, image_url: '/pass.png' },
  { id: '11', title: '2026 Hidden Kice 시즌7', type: '패스', price: 76000, image_url: '/pass.png' },
  { id: '12', title: '2026 Hidden Kice 시즌7', type: '패스', price: 76000, image_url: '/pass.png' },
]

type FilterType = (typeof PRODUCT_FILTERS)[number]

export function useProducts() {
  const [filter, setFilter] = useState<FilterType>('전체')
  const [search, setSearch] = useState('')

  const products = useMemo(() => {
    return MOCK_PRODUCTS.filter((p) => {
      const matchType = filter === '전체' || p.type === (filter as ProductType)
      const matchSearch = p.title.includes(search)
      return matchType && matchSearch
    })
  }, [filter, search])

  return { products, filter, setFilter, search, setSearch }
}
