import api from "./client";

export const getQuizzes = async () => {
  const response = await api.get("/api/quizzes");
  return response.data;
};

export const fetchMostRecentQuizVersion = (quizId) => {
  return api.get(`api/quizzes/${quizId}/most_recent_quiz_version`);
};

export const fetchQuizShow = (quizId) => {
  return api.get(`api/quizzes/${quizId}`);
};
