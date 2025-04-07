export const ROUTES = {
  home: "/",
  notFound: "*",
  quizSubmissionShow: "/submissions/:id",
  backoffice: "/backoffice",
  searchUsers: "/search/users",
  searchQuizzes: "/search/quizzes",
  searchCohorts: {
    path: "/search/quizzes/:quizId/cohorts",
    build: (id) => `/search/quizzes/${id}/cohorts`,
  },
  searchUsersByCohorts: {
    path: "/search/quizzes/:quizId/cohorts/:cohortId/users",
    build: (id, id2) => `/search/quizzes/${id}/cohorts/${id2}/users`,
  },
};
