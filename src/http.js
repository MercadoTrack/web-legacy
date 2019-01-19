import axios from 'axios'

const mtInstance = axios.create({
  baseURL: 'https://api.mercadotrack.com/',
  timeout: 15000
})

export default mtInstance
