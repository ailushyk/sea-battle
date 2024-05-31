'use server'

import { redirect } from 'next/navigation'

import { auth, login } from '@/lib/auth'

export async function loginAction() {
  const session = auth()
  if (!session) {
    await login()
  }
  redirect(`/dashboard`)
}
