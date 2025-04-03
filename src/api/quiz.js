import api from "./client";

export const getQuizzes = async () => {
  const response = await api.get("/api/quizzes");
  return response.data;
};
