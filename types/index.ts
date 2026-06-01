export type ProductType = '패스' | '단품'

export interface Product {
  id: string
  title: string
  type: ProductType
  price?: number
  discount_rate: number
  shipping_fee?: number
  image_url?: string
}

export interface CartItem {
  product: Product
  quantity: number
}

export type OrderStatus = '주문완료' | '결제완료' | '취소'

export interface Order {
  id: string
  user_id?: string
  email: string
  phone?: string
  name?: string
  recipient_name?: string
  recipient_phone: string
  zipcode?: string
  address: string
  address_detail?: string
  payment_method: string
  shipping_fee: number
  status: OrderStatus
  total_amount: number
  created_at: string
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  quantity: number
  unit_price: number
}
