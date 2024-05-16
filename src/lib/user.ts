import { cookies } from 'next/headers'

export const SEA_BATTLE_USER_KEY = 'sb_user'

export type User = {
  id: string
}

export function getUser() {
  const cookieStore = cookies()
  const user = cookieStore.get(SEA_BATTLE_USER_KEY)

  if (!user) {
    throw new Error(
      'User not found. Please check if the middleware is enabled.',
    )
  }

  return {
    id: user.value,
  }
}
