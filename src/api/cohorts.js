import api from "./client";

export const getCohortsWithSubmissions = async (quizId) => {
  const response = await api.get(
    `/api/quizzes/${quizId}/cohorts_with_submissions`
  );
  return response.data;
};
