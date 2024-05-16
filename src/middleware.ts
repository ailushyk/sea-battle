import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { v4 } from 'uuid'

import { SEA_BATTLE_USER_KEY } from '@/lib/user'

export function middleware(request: NextRequest) {
  let cookie = request.cookies.get(SEA_BATTLE_USER_KEY)
  const response = NextResponse.next()
  if (!cookie) {
    response.cookies.set({
      name: SEA_BATTLE_USER_KEY,
      value: v4(),
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
    })
  }

  return response
}
