import api from "./client";

export const getUsers = async (filters) => {
  const response = await api.get(`/api/users${filters}`);
  return response.data;
};
