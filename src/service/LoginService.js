import axios from "axios";

const baseUrl = 'http://localhost'

const login = (requestBody) => {
    return axios.post(`${baseUrl}/login`, requestBody)
}
const register = (requestBody) => {
    return axios.post(`${baseUrl}/register`, requestBody)
}

export default {login, register}