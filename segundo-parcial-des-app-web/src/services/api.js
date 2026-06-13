import axios from 'axios'

// IMPORTANTE: en MockAPI crea DOS recursos: "products" y "users"
export const BASE_URL = 'https://6a0e46781736097c3609a5aa.mockapi.io'

export const api = axios.create({
  baseURL: BASE_URL
})