import api from "./client";

export const delQuizVersionId = async (id) => {
  const response = await api.delete(`/api/quiz_versions/${id}`);
  return response.data;
};
