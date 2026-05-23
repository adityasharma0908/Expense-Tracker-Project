import axios from "axios"

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

API.interceptors.request.use(

  (req) => {

    const token =
      localStorage.getItem("token")

    if (

      token &&

      !req.url.includes("/login") &&

      !req.url.includes("/register")

    ) {

      req.headers.Authorization =
        `Bearer ${token}`

    }

    return req

  }

)

export default API