import api from "./client";

export const getQuizzes = async (setData) => {
  const response = await api.get("/api/quizzes");
  return setData(response.data);
};
