'use client'

import { useProducts } from '@/hooks/useProducts'

export default function ProductsPage() {
  const { products, loading } = useProducts()

  if (loading) return <div>Loading...</div>

  return <div>Products</div>
}
