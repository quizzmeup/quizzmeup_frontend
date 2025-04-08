import api from "./client";

export const fetchSubmissionById = (id) => {
  return api.get(`/api/submissions/${id}`);
};

export const fetchSubmissionsByUserId = async (id) => {
  const response = await api.get(`/api/users/${id}/submissions`);
  return response.data;
};
