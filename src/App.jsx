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
import ResultQuizSession from "./pages/ResultQuizSession/ResultQuizSession";

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
            path={ROUTES.quizSessionResult}
            element={<ResultQuizSession />}
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
