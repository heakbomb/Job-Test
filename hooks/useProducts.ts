'use client'

import { useEffect, useState } from 'react'

export const useProducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // TODO: Supabase에서 상품 데이터 페칭
    setLoading(false)
  }, [])

  return { products, loading }
}
