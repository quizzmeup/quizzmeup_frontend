import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ROUTES } from "./routes";
import "./App.css";

// Providers
import { AuthProvider } from "./contexts/AuthContext";
import { ModalProvider } from "./contexts/ModalContext";
import { ToastProvider } from "./contexts/ToastContext";

// UI Components
import Layout from "./components/Layout/Layout";
import SignupModal from "./components/SignupModal/SignupModal";
import LoginModal from "./components/LoginModal/LoginModal";
import AdminModal from "./components/AdminModal/AdminModal";

// Pages
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";
import QuizSubmissionShow from "./pages/QuizSubmissionShow/QuizSubmissionShow";
import BackofficeHome from "./pages/BackofficeHome/BackofficeHome";
import AnswerQuiz from "./pages/AnswerQuiz/AnswerQuiz";
import SearchUsersPage from "./pages/SearchPage/SearchUsersPage";
import SearchQuizzesPage from "./pages/SearchPage/SearchQuizzesPage";
import CohortManager from "./pages/CohortManager/CohortManager";
import CohortsWithSubmissionsList from "./pages/SearchPage/CohortsWithSubmissionsList";
import CohortUsersWithSubmissionList from "./pages/SearchPage/CohortUsersWithSubmissionList";
import UserSubmissionList from "./pages/SearchPage/UserSubmissionList";

const AppContent = () => {
  return (
    <Router>
      <SignupModal />
      <LoginModal />
      <AdminModal />
      <Routes>
        <Route element={<Layout />}>
          <Route path={ROUTES.home} element={<Home />} />
          <Route path={ROUTES.notFound} element={<NotFound />} />

          <Route
            path={ROUTES.quizSubmissionShow.path}
            element={<QuizSubmissionShow />}
          />
          <Route path={ROUTES.backoffice} element={<BackofficeHome />} />
          <Route path={ROUTES.answerQuiz.path} element={<AnswerQuiz />} />
          <Route path={ROUTES.searchUsers} element={<SearchUsersPage />} />
          <Route
            path={ROUTES.userSubmissionList.path}
            element={<UserSubmissionList />}
          />
          <Route path={ROUTES.searchQuizzes} element={<SearchQuizzesPage />} />
          <Route path={ROUTES.cohortManager} element={<CohortManager />} />
          <Route
            path={ROUTES.cohortsWithSubmissionsList.path}
            element={<CohortsWithSubmissionsList />}
          />
          <Route
            path={ROUTES.cohortUsersWithSubmissionList.path}
            element={<CohortUsersWithSubmissionList />}
          />
        </Route>
      </Routes>
    </Router>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <ToastProvider>
        <ModalProvider>
          <AppContent />
        </ModalProvider>
      </ToastProvider>
    </AuthProvider>
  );
};

export default App;
