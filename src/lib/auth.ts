// TODO: use auth.js and Keycloak provider
import { cookies } from 'next/headers'
import { v4 } from 'uuid'

import { decode, encode } from '@/lib/codec'
import { makeApiRequest } from '@/services/api-service'

export const SEA_AUTH_COOKIE = 'sb_auth'
export const SEA_REFRESH_COOKIE = 'sb_refresh_token'

export type User = {
  id: string
  iat: number
  exp: number
  accessToken: string
  refreshToken: string
}

function auth(): User | null {
  const cookieStore = cookies()
  const session = cookieStore.get(SEA_AUTH_COOKIE)

  if (!session) {
    return null
  }

  return decode(session.value)
}

async function login() {
  const token = await makeApiRequest('/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: v4(), // generate a random user id for new users
    }),
  })
  setUserToken(token, cookies())
  return { user: token }
}

async function refresh(): Promise<User | null> {
  const cookieStore = cookies()
  const cookie = cookieStore.get(SEA_REFRESH_COOKIE)
  if (!cookie) {
    return null
  }
  const refreshToken = decode(cookie.value)
  return await makeApiRequest('/auth/refresh', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: refreshToken,
    }),
  })
}

/**
 * It should be used only in a Server Action or Middleware
 */
function setUserToken({ refreshToken, ...user }: User, cookieStore: any) {
  cookieStore.set({
    name: SEA_AUTH_COOKIE,
    value: encode(user),
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    expires: user.exp * 1000,
  })

  cookieStore.set({
    name: SEA_REFRESH_COOKIE,
    value: encode(refreshToken),
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 365, // 1 year
  })
}

export { auth, login, refresh, setUserToken }
