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
        setError("Les deux mots de passe doivent être identiques");
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
      showToast("Vous êtes connecté", "success");
    } else {
      setError("Aucun token reçu.");
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
            placeholder="Nom prénom"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Confirmez le mot de passe"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          {error && <p className="error-message">{error}</p>}

          <button type="submit">Créer un compte</button>

          <p className="modal-footer">
            Déjà un compte?{" "}
            <span
              className="switch-modal"
              onClick={() => {
                handleClose();
                openLoginModal();
              }}
            >
              Se connecter
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignupModal;
