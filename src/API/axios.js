import axios from 'axios';
const BASE_URL = `https://rentx-api-e9zj.onrender.com` || "http://localhost:5000/";
// const BASE_URL =  "http://localhost:5000/";

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

