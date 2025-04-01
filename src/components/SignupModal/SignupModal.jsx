import { useEffect, useState } from "react";
import { signup } from "../../api/auth";
import { useAuth } from "../../contexts/AuthContext";
import { useModal } from "../../contexts/ModalContext";
import { handleApiError } from "../../utils/apiErrorHandler";
import { useToast } from "../../contexts/ToastContext";
import "./SignupModal.css";

const SignupModal = () => {
  const { isSignupModalOpen, openLoginModal, closeModals } = useModal();
  const { handleLogin } = useAuth();
  const { showToast } = useToast();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  //check if passwords match
  useEffect(() => {
    if (confirmPassword) {
      if (password !== confirmPassword) {
        setError("The passwords must be equal");
      } else {
        setError("");
      }
    }
  }, [password, confirmPassword]);

  if (!isSignupModalOpen) return null;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    let data;
    try {
      data = await signup({ name, email, password });
    } catch (err) {
      setError(handleApiError(err));
      return;
    }

    if (data.token && data.user) {
      handleLogin(data.token, data.user);
      handleClose();
      showToast("Signed up successfully", "success");
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
        <h2>Sign up</h2>
        <form className="modal-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

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

          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <p className="newsletter-info">
            By signing up, I confirm I have read and agree to the{" "}
            <a href="#">Terms & Conditions</a> and{" "}
            <a href="#">Privacy Policy</a>. <br />I confirm I am at least 18
            years old.
          </p>

          {error && <p className="error-message">{error}</p>}

          <button type="submit">Sign up</button>

          <p className="modal-footer">
            Already have an account?{" "}
            <span
              className="switch-modal"
              onClick={() => {
                handleClose();
                openLoginModal();
              }}
            >
              Log in here
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignupModal;
