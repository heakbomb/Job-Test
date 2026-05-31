'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { signupAction } from '@/app/actions/auth'

export default function RegisterForm() {
  const [state, action, pending] = useActionState(signupAction, null)

  return (
    <form action={action} className="flex flex-col gap-[16px]">
      {state?.error && (
        <p className="text-[13px] text-red-500 text-center">{state.error}</p>
      )}

      <input
        name="name"
        type="text"
        placeholder="이름"
        className="w-full h-[48px] px-[16px] border border-line rounded-sm text-[14px] text-ink placeholder:text-muted outline-none focus:border-brand transition-colors"
      />
      <input
        name="email"
        type="email"
        placeholder="이메일"
        required
        className="w-full h-[48px] px-[16px] border border-line rounded-sm text-[14px] text-ink placeholder:text-muted outline-none focus:border-brand transition-colors"
      />
      <input
        name="password"
        type="password"
        placeholder="비밀번호"
        required
        className="w-full h-[48px] px-[16px] border border-line rounded-sm text-[14px] text-ink placeholder:text-muted outline-none focus:border-brand transition-colors"
      />
      <input
        name="confirm"
        type="password"
        placeholder="비밀번호 확인"
        required
        className="w-full h-[48px] px-[16px] border border-line rounded-sm text-[14px] text-ink placeholder:text-muted outline-none focus:border-brand transition-colors"
      />

      <button
        type="submit"
        disabled={pending}
        className="w-full h-[48px] bg-brand text-white text-[16px] font-semibold rounded-sm disabled:opacity-50 hover:opacity-90 transition-opacity mt-[8px]"
      >
        {pending ? '처리 중...' : '회원가입'}
      </button>

      <p className="text-[13px] text-muted text-center">
        이미 계정이 있으신가요?{' '}
        <Link href="/login" className="text-brand font-semibold">
          로그인
        </Link>
      </p>
    </form>
  )
}
