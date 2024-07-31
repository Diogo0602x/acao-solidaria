import { API } from '@/api'

export const getUserProfile = async (userId: string) => {
  try {
    const response = await API.get(`/users/${userId}`)
    return { data: response.data, status: response.status }
  } catch (error) {
    return { data: null, status: error.response?.status || 500 }
  }
}

export const updateUserProfile = async (userId: string, data: any) => {
  try {
    if (data.password) {
      delete data.password
    }

    const response = await API.put(`/users/${userId}`, data)
    return { data: response.data, status: response.status }
  } catch (error) {
    return { data: null, status: error.response?.status || 500 }
  }
}
