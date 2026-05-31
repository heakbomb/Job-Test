'use client'

import { useEffect, useMemo, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Product, ProductType } from '@/types'
import { PRODUCT_FILTERS } from '@/constants'

type FilterType = (typeof PRODUCT_FILTERS)[number]

export function useProducts() {
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<FilterType>('전체')
  const [search, setSearch] = useState('')

  useEffect(() => {
    const supabase = createClient()
    supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        if (data) setAllProducts(data)
        setLoading(false)
      })
  }, [])

  const products = useMemo(() => {
    return allProducts.filter((p) => {
      const matchType = filter === '전체' || p.type === (filter as ProductType)
      const matchSearch = p.title.includes(search)
      return matchType && matchSearch
    })
  }, [allProducts, filter, search])

  return { products, loading, filter, setFilter, search, setSearch }
}
