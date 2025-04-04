import api from "./client";
import { handleApiError } from "../utils/apiErrorHandler";

export const getQuizzes = async () => {
  const response = await api.get("/api/quizzes");
  return response.data;
};

export const getMostRecentQuizVersion = async (quiz_id, setError) => {
  try {
    if (!quiz_id) {
      return null;
    } else {
      const response = await api.get(
        `/api/quizzes/${quiz_id}/most_recent_quiz_version`
      );
      return response.data;
    }
  } catch (error) {
    setError(handleApiError(error));
  }
};
