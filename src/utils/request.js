import axios from 'axios'
import config from '@/config'

const service = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  timeout: config.timeout
})

export default service
