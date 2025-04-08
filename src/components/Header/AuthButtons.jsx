import { useModal } from "../../contexts/ModalContext";
import { useAuth } from "../../contexts/AuthContext";
import { useToast } from "../../contexts/ToastContext";
import { useNavigate } from "react-router-dom";
import "./AuthButtons.css";

const AuthButtons = () => {
  const navigate = useNavigate();

  const { openLoginModal, openSignupModal, openAdminModal } = useModal();
  const { token, userData, handleLogout } = useAuth();
  const { showToast } = useToast();

  // navigate to backoffice if user is already admin
  const adminClickHandler = () => {
    userData.isAdmin ? navigate("/backoffice") : openAdminModal();
  };

  return (
    <div className="auth-buttons">
      <div className="student-auth">
        {token ? (
          <>
            <button
              type="button"
              className="auth-btn logout"
              onClick={() => {
                handleLogout();
                showToast("Vous êtes déconnecté", "success");
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button type="button" className="auth-btn" onClick={openLoginModal}>
              Se connecter
            </button>
            <button
              type="button"
              className="auth-btn"
              onClick={openSignupModal}
            >
              S'enregister
            </button>
          </>
        )}
      </div>
      {token && (
        <div className="admin-auth">
          <button
            type="button"
            className="auth-btn backoff-btn"
            onClick={adminClickHandler}
          >
            Espace formateur
          </button>
        </div>
      )}
    </div>
  );
};

export default AuthButtons;
