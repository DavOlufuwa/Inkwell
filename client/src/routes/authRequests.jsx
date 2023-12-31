import axios from "axios";

const loginUrl = "https://inkwell-u8co.onrender.com/api/login";
const signupUrl = "https://inkwell-u8co.onrender.com/api/users";

const refreshUrl = "https://inkwell-u8co.onrender.com/api/refresh";

const config = {
  headers: {
    "siteName" : "Strict"
  },
  withCredentials: true
}

export const loginUser = async (credentials) => {
  const response = await axios.post(loginUrl, credentials,);
  return response.data;
};

export const signupUser = async (credentials) => {
  const response = await axios.post(signupUrl, credentials);
  return response.data;
};



export const refreshUser = async () => {
  const response = await axios.get(refreshUrl, config);
  return response;
}
