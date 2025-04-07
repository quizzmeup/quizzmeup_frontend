export const ROUTES = {
  home: "/",
  notFound: "*",
  backoffice: "/backoffice",
  quizCreate: "/backoffice/quizzes/new",
  quizEdit: {
    path: "/backoffice/quizzes/:quizId/most_recent_quiz_version",
    build: (quizId) => `/backoffice/quizzes/${quizId}/most_recent_quiz_version`,
  },
  resultUsers: "/result/users",
};
