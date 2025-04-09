import api from "./client";

export const getCohorts = () => {
  return api.get("/api/cohorts");
};

export const createCohort = (name) => {
  return api.post("/api/cohorts", { name });
};
