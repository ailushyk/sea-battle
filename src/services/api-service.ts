export function getApiUrl(path: string) {
  const apiUrl = process.env.API_URL
  if (!apiUrl) {
    throw new Error('API_URL is not defined')
  }
  return path.startsWith('/') ? `${apiUrl}${path}` : path
}

export const makeApiRequest = async (path: string, init?: RequestInit) => {
  console.info('makeApiRequest', path)
  const url = getApiUrl(path)
  let resp
  try {
    resp = await fetch(url, init)
    if (resp.ok) {
      if (resp.status === 204) {
        return null
      }
      return await resp.json()
    }
  } catch (err: any) {
    console.error(err)
    throw new Error('Failed to make API request')
  }

  throw new Error(resp.statusText)
}
