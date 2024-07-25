import { API } from '@/api'
import { isPrincipalUser } from '@/commons'

export const getPrincipalUsers = async () => {
  const response = await API.get('/principal-users/combo-select')
  return response.data
}

export const getAddressByCep = async (cep: string) => {
  try {
    const response = await API.get(`/address/${cep}`)
    return { data: response.data, status: response.status }
  } catch (error) {
    return { data: null, status: error.response?.status || 500 }
  }
}

export const createUser = async (data: any) => {
  const url = isPrincipalUser(data.role) ? '/principal-users' : '/users'
  const response = await API.post(url, data)
  return response.data
}
