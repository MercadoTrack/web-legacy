import axios from 'axios'

const mtInstance = axios.create({
  baseURL: 'https://api.mercadotrack.com/',
  timeout: 15000,
  // withCredentials: true
})

export default mtInstance
