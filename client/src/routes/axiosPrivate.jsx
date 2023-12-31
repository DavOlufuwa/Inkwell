import axios from "axios";
const BASE_URL = "https://inkwell-u8co.onrender.com";

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { 
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default axios.create({ 
  baseURL: BASE_URL 
});
