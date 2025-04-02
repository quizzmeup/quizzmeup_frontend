import { useModal } from "../../contexts/ModalContext";
import { useAuth } from "../../contexts/AuthContext";
import { useToast } from "../../contexts/ToastContext";
import "./AuthButtons.css";

const AuthButtons = () => {
  const { openLoginModal, openSignupModal } = useModal();
  const { token, handleLogout } = useAuth();
  const { showToast } = useToast();

  return (
    <div className="auth-buttons">
      <div className="student-auth">
        {token ? (
          <>
            <button
              type="button"
              className="auth-btn "
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
      <div className="admin-auth">
        <button type="button" className="auth-btn backoff-btn">
          Espace formateur
        </button>
      </div>
    </div>
  );
};

export default AuthButtons;
