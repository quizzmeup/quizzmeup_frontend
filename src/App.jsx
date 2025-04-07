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
import SearchUsersPage from "./pages/SearchPage/SearchUsersPage";
import SearchQuizzesPage from "./pages/SearchPage/SearchQuizzesPage";
import SearchCohortsPage from "./pages/SearchPage/SearchCohortsPage";
import SearchUsersByCohorts from "./pages/SearchPage/SearchUsersByCohorts";
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
            path={ROUTES.quizSubmissionShow}
            element={<QuizSubmissionShow />}
          />
          <Route path={ROUTES.backoffice} element={<BackofficeHome />} />
          <Route path={ROUTES.searchUsers} element={<SearchUsersPage />} />
          <Route
            path={ROUTES.userSubmissionList.path}
            element={<UserSubmissionList />}
          />
          <Route path={ROUTES.searchQuizzes} element={<SearchQuizzesPage />} />
          <Route
            path={ROUTES.searchCohorts.path}
            element={<SearchCohortsPage />}
          />
          <Route
            path={ROUTES.searchUsersByCohorts.path}
            element={<SearchUsersByCohorts />}
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
