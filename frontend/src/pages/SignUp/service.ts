import { API } from '@/api'

export const getPrincipalUsers = async () => {
  try {
    const response = await API.get('/users/principal-users/combo-select')
    return { data: response.data, status: response.status }
  } catch (error) {
    return { data: null, status: error.response?.status || 500 }
  }
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
  try {
    const response = await API.post('/users', data)
    return { data: response.data, status: response.status }
  } catch (error) {
    return { data: null, status: error.response?.status || 500 }
  }
}
