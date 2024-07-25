export const isPrincipalUser = (role: string) => {
  return role === 'church' || role === 'seminary'
}
