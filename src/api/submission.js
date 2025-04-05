import api from "./client";

export const fetchSubmissionById = (id) => {
  return api.get(`/api/submissions/${id}`);
};
