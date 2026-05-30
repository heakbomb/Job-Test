'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NAV_ITEMS } from '@/constants'

export default function Header() {
  const pathname = usePathname()

  return (
    <header className="w-full h-[100px] bg-white flex items-center justify-center">
      <div className="w-[1280px] h-[80px] flex items-center justify-between">
        <div className="flex items-center gap-10">
          <Link href="/" className="text-[18px] font-bold text-brand">
            히든카이스
          </Link>

          <nav className="flex items-center gap-[24px]">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href || (item.href === '/products' && pathname === '/')
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`text-[16px] font-semibold ${isActive ? 'text-brand' : 'text-muted'}`}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </div>

        <div className="flex items-center gap-[16px]">
          <button className="relative text-ink" aria-label="장바구니">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="absolute -top-1 -right-1 w-[15px] h-[15px] bg-brand rounded-full flex items-center justify-center text-[10px] text-white">1</span>
          </button>

          <button className="relative text-ink" aria-label="알림">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="absolute -top-1 -right-1 w-[15px] h-[15px] bg-brand rounded-full flex items-center justify-center text-[10px] text-white">1</span>
          </button>

          <button className="text-ink" aria-label="프로필">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}
