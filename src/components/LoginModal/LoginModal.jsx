import { useState } from "react";
import { login } from "../../api/auth";
import { useAuth } from "../../contexts/AuthContext";
import { useModal } from "../../contexts/ModalContext";
import { handleApiError } from "../../utils/apiErrorHandler";
import { useToast } from "../../contexts/ToastContext";
import "./LoginModal.css";

const LoginModal = () => {
  const { isLoginModalOpen, openSignupModal, closeModals } = useModal();
  const { handleLogin } = useAuth();
  const { showToast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (!isLoginModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    let data;
    try {
      data = await login({ email, password });
    } catch (err) {
      setError(handleApiError(err));
      return;
    }

    if (data.token && data.user) {
      handleLogin(data.token, data.user);
      handleClose();
      showToast("Logged in successfully", "success");
    } else {
      setError("No token received.");
    }
  };

  const handleClose = () => {
    setEmail("");
    setPassword("");
    setError("");
    closeModals();
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={handleClose}>
          ✖
        </button>
        <h2>Login</h2>
        <form className="modal-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="error-message">{error}</p>}

          <button type="submit">Login</button>

          <p className="modal-footer">
            Don't have an account?{" "}
            <span
              className="switch-modal"
              onClick={() => {
                handleClose();
                openSignupModal();
              }}
            >
              Sign up!
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;

