import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { auth, refresh, setUserToken } from '@/lib/auth'

export async function middleware(request: NextRequest) {
  console.log('middleware', request.url)
  const publicRoutes = ['/']

  if (publicRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.next()
  }

  const user = auth()
  if (!user || user.exp * 1000 < Date.now()) {
    // refresh token if it's possible
    const token = await refresh()
    if (!token) {
      return NextResponse.redirect(new URL('/', request.url))
    }
    const response = NextResponse.next()
    setUserToken(token, response.cookies)
    return response
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)'],
}
