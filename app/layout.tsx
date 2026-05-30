import type { Metadata } from 'next'
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
      <body className="min-h-screen">{children}</body>
    </html>
  )
}
