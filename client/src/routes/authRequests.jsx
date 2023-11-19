import axios from "axios";
const loginUrl = "/api/login";
const signupUrl = "/api/users";
const logooutUrl = "/api/logout";

export const loginUser = async (credentials) => {
  const response = await axios.post(loginUrl, credentials);
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
