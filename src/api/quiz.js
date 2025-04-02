import api from "./client";

export const quiz = async () => {
  const response = await api.get("/api/quizzes");
  console.log(response);

  return response.data;
};
