export const ROUTES = {
  home: "/",
  notFound: "*",
  backoffice: "/backoffice",
  answerQuiz: {
    path: "/quizzes/:quizId/answer", // utilisé dans <Route />
    build: (id) => `/quizzes/${id}/answer`, // utilisé dans navigate()
  },
};
