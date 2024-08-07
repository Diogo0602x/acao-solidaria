/* eslint-disable camelcase */
import { API } from '@/api'

export const createFundraising = async (data: {
  name: string
  quantity: number
  quantityAvailable: number
  price: number
  imageUrl: string
  userId: string
}) => {
  try {
    const response = await API.post('/fundraising', data)
    return { data: response.data, status: response.status }
  } catch (error) {
    return { data: null, status: error.response?.status || 500 }
  }
}

export const fundraisingCreated = async (userId: string) => {
  try {
    const response = await API.get(`/fundraising/sales/user/${userId}`)
    return { data: response.data, status: response.status }
  } catch (error) {
    return { data: null, status: error.response?.status || 500 }
  }
}

export const fundraisingBought = async (userId: string) => {
  try {
    const response = await API.get(`/fundraising/purchases/user/${userId}`)
    return { data: response.data, status: response.status }
  } catch (error) {
    return { data: null, status: error.response?.status || 500 }
  }
}

export const getAllFundraisings = async () => {
  try {
    const response = await API.get(`/fundraising/`)
    return { data: response.data, status: response.status }
  } catch (error) {
    return { data: null, status: error.response?.status || 500 }
  }
}

export const purchaseFundraising = async (data: {
  fundraisingId: string
  userId: string
  quantity: number
}) => {
  try {
    const response = await API.post('/fundraising/purchase', data)
    return { data: response.data, status: response.status }
  } catch (error) {
    return { data: null, status: error.response?.status || 500 }
  }
}
