import api from "./client";

export const delQuizVersionId = async (id) => {
  const response = await api.delete(`/api/quiz_versions/${id}`);
  return response.data;
};

export const publishQuizVersionId = async (id) => {
  const response = await api.put(`/api/quiz_versions/${id}/publish`);
  return response.data;
};

export const putQuizVersionId = async (id, payload) => {
  const response = await api.put(`/api/quiz_versions/${id}`, payload);
  return response.data;
};

export const postQuizVersionId = async (quizId, payload) => {
  const response = await api.post(
    `/api/quizzes/${quizId}/quiz_versions`,
    payload
  );
  return response.data;
};
