import axios from "axios";

const baseUrl = "http://localhost:3500";

export const getBlogs = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

export const getArticle = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};
