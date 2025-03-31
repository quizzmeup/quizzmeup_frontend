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
      {token ? (
        <>
          <button
            type="button"
            className="auth-btn logout"
            onClick={() => {
              handleLogout();
              showToast("Logged out successfully", "success");
            }}
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <button
            type="button"
            className="auth-btn login"
            onClick={openLoginModal}
          >
            Login
          </button>
          <button
            type="button"
            className="auth-btn signup"
            onClick={openSignupModal}
          >
            Signup
          </button>
        </>
      )}
    </div>
  );
};

export default AuthButtons;
