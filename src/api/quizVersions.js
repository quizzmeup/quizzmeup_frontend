import api from "./client";

export const deleteQuizVersion = async (id) => {
  const response = await api.delete(`/api/quiz_versions/${id}`);
  return response.data;
};

export const publishQuizVersion = async (id) => {
  const response = await api.put(`/api/quiz_versions/${id}/publish`);
  return response.data;
};

export const updateQuizVersion = async (id, payload) => {
  const response = await api.put(`/api/quiz_versions/${id}`, payload);
  return response.data;
};

export const createQuizVersion = async (quizId, payload) => {
  const response = await api.post(
    `/api/quizzes/${quizId}/quiz_versions`,
    payload
  );
  return response.data;
};
