import axios from 'axios';
const BASE_URL = `https://rentx-api-e9zj.onrender.com`
export default axios.create({
    baseURL: BASE_URL, headers: { 'Content-Type': 'application/json' },
    withCredentials: true
})
export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
})

export const axiosMutation = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'multipart/formdata' },
    withCredentials: true
})