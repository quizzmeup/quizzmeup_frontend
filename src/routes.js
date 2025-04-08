export const ROUTES = {
  home: "/",
  notFound: "*",
  quizSubmissionShow: {
    path: "/submissions/:id",
    build: (id) => `/submissions/${id}`,
  },
  backoffice: "/backoffice",

  answerQuiz: {
    path: "/quizzes/:quizId/answer", // utilisé dans <Route />
    build: (id) => `/quizzes/${id}/answer`,
  },

  searchUsers: "/search/users",
  searchQuizzes: "/search/quizzes",
  cohortsWithSubmissionsList: {
    path: "/search/quizzes/:quizId/cohorts",
    build: (id) => `/search/quizzes/${id}/cohorts`,
  },

  cohortUsersWithSubmissionList: {
    path: "/search/quizzes/:quizId/cohorts/:cohortId/users",
    build: (id, id2) => `/search/quizzes/${id}/cohorts/${id2}/users`,
  },

  userSubmissionList: {
    path: "/search/users/:userId/submissions",
    build: (id) => `/search/users/${id}/submissions`,
  },
};
