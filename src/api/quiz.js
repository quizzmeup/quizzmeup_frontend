import api from "./client";

export const getQuizzes = async (filters = "") => {
  const response = await api.get(`/api/quizzes${filters}`);
  return response.data;
};
