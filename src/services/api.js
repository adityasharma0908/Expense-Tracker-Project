import axios from "axios"

const API = axios.create({
  baseURL: "http://localhost:3001/api"
})

// ADD TOKEN AUTOMATICALLY

API.interceptors.request.use(

  (config) => {

    const token =
      localStorage.getItem("token")

    if (token) {

      config.headers.Authorization =
        token

    }

    return config

  },

  (error) => {

    return Promise.reject(error)

  }

)

export default API