import api from "./client";

export const getQuizzes = async () => {
  const response = await api.get("/api/quizzes");
  return response.data;
};

export const getMostRecentQuizVersion = async (quiz_id) => {
  const response = await api.get(
    `/api/quizzes/${quiz_id}/most_recent_quiz_version?includeUnpublished=true`
  );
  return response.data;
};
