import api from "./client"; // contient les headers auth

export const createSubmission = (quizVersionId, payload) => {
  return api.post(`api/quiz_versions/${quizVersionId}/submissions`, payload);
};
