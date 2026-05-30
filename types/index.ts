export type ProductType = '패스' | '단품'

export interface Product {
  id: string
  title: string
  type: ProductType
  price?: number
  image_url?: string
}
