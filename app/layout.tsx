import type { Metadata } from 'next'
import { CartProvider } from '@/contexts/CartContext'
import './globals.css'

export const metadata: Metadata = {
  title: '히든카이스 스토어',
  description: '히든카이스 공식 스토어',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className="min-h-screen">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  )
}
