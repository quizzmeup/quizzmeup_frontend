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
import BackofficeHome from "./pages/BackofficeHome/BackofficeHome";
import Result from "./pages/Result/Result";

// Raquêtes api
import { getUsers } from "./api/users";
import { getQuizzes } from "./api/quiz";

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
          <Route path={ROUTES.backoffice} element={<BackofficeHome />} />
          <Route
            path={ROUTES.resultUsers}
            element={
              <Result
                pageTitle="utilisateurs"
                request={getUsers}
                placeholder="utilisateur"
                tagKey="name"
              />
            }
          />
          <Route
            path={ROUTES.resultByQuiz}
            element={
              <Result
                pageTitle="formulaires"
                request={getQuizzes}
                placeholder="formulaire"
                tagKey="title"
              />
            }
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
