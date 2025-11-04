import axios from "axios"

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "/api",
  timeout: 15000,
})

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token") // o de un store
//   if (token) {
//     config.headers = config.headers ?? {}
//    config.headers.Authorization = `Bearer ${token}`
//   }
//   return config
// })