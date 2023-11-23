import axios from "axios";

const loginUrl = "/api/login";
const signupUrl = "/api/users";
const logooutUrl = "/api/logout";
const refreshUrl = "/api/refresh";

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

export const logout = async () => {
  const response = await axios.get(logooutUrl);
  return response.data;
};

export const refreshUser = async () => {
  const response = await axios.get(refreshUrl, config);
  return response;
}
