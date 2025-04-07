import api from "./client";

export const getCohortsWithSubmissions = async (quizId) => {
  const response = await api.get(`/api/${quizId}/cohortd_with_submissions`);
  return response.data;
};
