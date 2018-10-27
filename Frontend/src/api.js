import axios from 'axios'
import httpAdapter from 'axios/lib/adapters/http'

const instance = axios.create({
  baseURL: 'http://192.168.15.18:3000',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
  adapter: httpAdapter,
  withCredentials: true
})

export default {
  get_public_channels() {
    return instance.get('public_channels')
  }
}
