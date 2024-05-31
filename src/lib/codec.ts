/**
 * COding and DECoding data
 */
export const encode = (data: unknown) => btoa(JSON.stringify(data))
export const decode = (data: string) => JSON.parse(atob(data))
