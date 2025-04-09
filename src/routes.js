export const ROUTES = {
  home: "/",
  notFound: "*",
  backoffice: "/backoffice",
  quizCreate: "/backoffice/quizzes/new",
  quizEdit: {
    path: "/backoffice/quizzes/:quizId/edit",
    build: (quizId) => `/backoffice/quizzes/${quizId}/edit`,
  },
  resultUsers: "/result/users",
};
