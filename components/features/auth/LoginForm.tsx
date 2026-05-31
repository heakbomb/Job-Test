'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { loginAction } from '@/app/actions/auth'

interface Props {
  registered?: boolean
}

export default function LoginForm({ registered }: Props) {
  const [state, action, pending] = useActionState(loginAction, null)

  return (
    <form action={action} className="flex flex-col gap-[16px]">
      {registered && (
        <p className="text-[13px] text-brand text-center bg-brand/10 px-[12px] py-[10px] rounded-sm">
          가입이 완료됐습니다. 이메일을 확인한 뒤 로그인해 주세요.
        </p>
      )}
      {state?.error && (
        <p className="text-[13px] text-red-500 text-center">{state.error}</p>
      )}

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

      <button
        type="submit"
        disabled={pending}
        className="w-full h-[48px] bg-brand text-white text-[16px] font-semibold rounded-sm disabled:opacity-50 hover:opacity-90 transition-opacity mt-[8px]"
      >
        {pending ? '로그인 중...' : '로그인'}
      </button>

      <p className="text-[13px] text-muted text-center">
        아직 계정이 없으신가요?{' '}
        <Link href="/register" className="text-brand font-semibold">
          회원가입
        </Link>
      </p>
    </form>
  )
}
