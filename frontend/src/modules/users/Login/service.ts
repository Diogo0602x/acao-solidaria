import { API } from '@/api'

export const loginUser = async (data: {
  identifier: string
  password: string
}) => {
  try {
    const response = await API.post('/users/login', data)
    return { data: response.data, status: response.status }
  } catch (error) {
    return { data: null, status: error.response?.status || 500 }
  }
}
