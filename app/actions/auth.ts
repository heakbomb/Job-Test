'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

type AuthState = { error: string } | null

export async function loginAction(prevState: AuthState, formData: FormData): Promise<AuthState> {
  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  })
  if (error) return { error: error.message }
  redirect('/')
}

export async function signupAction(prevState: AuthState, formData: FormData): Promise<AuthState> {
  const supabase = await createClient()
  const password = formData.get('password') as string
  const confirm = formData.get('confirm') as string

  if (password !== confirm) return { error: '비밀번호가 일치하지 않습니다.' }

  const { error } = await supabase.auth.signUp({
    email: formData.get('email') as string,
    password,
    options: {
      data: { name: formData.get('name') as string },
    },
  })
  if (error) return { error: error.message }
  redirect('/login?registered=1')
}
