import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

export const salePrice = (price: number, discountRate: number): number =>
  Math.round(price * (1 - discountRate / 100))
