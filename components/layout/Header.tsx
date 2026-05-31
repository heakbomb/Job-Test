'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import type { User } from '@supabase/supabase-js'
import { NAV_ITEMS } from '@/constants'
import { useCart } from '@/contexts/CartContext'
import { createClient } from '@/lib/supabase/client'

export default function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const { totalCount } = useCart()
  const [user, setUser] = useState<User | null>(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    setDropdownOpen(false)
    router.push('/')
    router.refresh()
  }

  const displayName =
    user?.user_metadata?.name || user?.email?.split('@')[0] || '사용자'

  return (
    <header className="w-full h-[100px] bg-white flex items-center justify-center">
      <div className="w-[1280px] h-[80px] flex items-center justify-between">
        <div className="flex items-center gap-10">
          <Link href="/" className="text-[18px] font-bold text-brand">
            히든카이스
          </Link>

          <nav className="flex items-center gap-[24px]">
            {NAV_ITEMS.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href === '/products' && pathname === '/')
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
          {/* 장바구니 */}
          <Link href="/cart" className="relative text-ink" aria-label="장바구니">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {totalCount > 0 && (
              <span className="absolute -top-1 -right-1 w-[15px] h-[15px] bg-brand rounded-full flex items-center justify-center text-[10px] text-white">
                {totalCount > 99 ? '99+' : totalCount}
              </span>
            )}
          </Link>

          {/* 알림 */}
          <button className="relative text-ink" aria-label="알림">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* 프로필 드롭다운 */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="text-ink"
              aria-label="프로필"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 top-[36px] w-[160px] bg-white border border-line rounded-sm shadow-md z-50">
                {user ? (
                  <>
                    <div className="px-[16px] py-[12px] text-[14px] font-semibold text-ink border-b border-line truncate">
                      {displayName}
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-[16px] py-[12px] text-[14px] text-muted hover:text-ink hover:bg-wash transition-colors"
                    >
                      로그아웃
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      onClick={() => setDropdownOpen(false)}
                      className="block px-[16px] py-[12px] text-[14px] text-ink hover:bg-wash transition-colors"
                    >
                      로그인
                    </Link>
                    <Link
                      href="/register"
                      onClick={() => setDropdownOpen(false)}
                      className="block px-[16px] py-[12px] text-[14px] text-ink hover:bg-wash transition-colors border-t border-line"
                    >
                      회원가입
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
