export const isPrincipalUser = (role: string) => {
  return role === 'church' || role === 'seminary'
}

export const formatNumber = (number: number) => {
  return number.toLocaleString('pt-BR')
}

export const formatCurrency = (number: number) => {
  return number.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}
