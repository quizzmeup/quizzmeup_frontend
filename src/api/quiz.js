import api from "./client";

export const getQuizzes = async (filters = "") => {
  const response = await api.get(`/api/quizzes${filters}`);
  return response.data;
};

export const getMostRecentQuizVersionWithUnpublished = async (quiz_id) => {
  const response = await api.get(
    `/api/quizzes/${quiz_id}/most_recent_quiz_version?includeUnpublished=true`
  );
  return response.data;
};

export const fetchMostRecentQuizVersion = (quizId) => {
  return api.get(`api/quizzes/${quizId}/most_recent_quiz_version`);
};

export const fetchQuizShow = (quizId) => {
  return api.get(`api/quizzes/${quizId}`);
};
