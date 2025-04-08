import api from "./client";

export const getUsers = async (filters = "") => {
  const response = await api.get(`/api/users${filters}`);
  return response.data;
};

export const getUsersWithSubmissions = async (quizId, cohortId) => {
  const response = await api.get(
    `/api/quizzes/${quizId}/cohorts/${cohortId}/users_with_submissions`
  );
  return response.data;
};
