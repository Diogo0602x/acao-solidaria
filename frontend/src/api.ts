import axios from 'axios'
import { env } from 'process'

const API = axios.create({
  baseURL: env.REACT_APP_API_URL,
})

export { API }
