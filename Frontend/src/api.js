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
  },
  broadcast(message, channels) {
    const other_channels = channels.map(c => c.id);
    const channel = other_channels.shift();
    return instance.post('broadcast', {message, channel, other_channels});
  }
}
