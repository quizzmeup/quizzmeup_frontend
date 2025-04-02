import { useState } from "react";
import { adminLogin } from "../../api/auth";
import { useModal } from "../../contexts/ModalContext";
import { handleApiError } from "../../utils/apiErrorHandler";
import { useToast } from "../../contexts/ToastContext";
import { useNavigate } from "react-router-dom";
import "./AdminModal.css";

const LoginModal = () => {
  const navigate = useNavigate();

  const { isAdminModalOpen, closeModals } = useModal();
  const { showToast } = useToast();

  const [adminPassword, setAdminPassword] = useState("");
  const [error, setError] = useState("");

  if (!isAdminModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    let data;
    try {
      data = await adminLogin({ password: adminPassword });
    } catch (err) {
      setError(handleApiError(err));
      return;
    }

    if (data.message) {
      handleClose();
      navigate("/backoffice/backoffice");
      showToast(data.message, "success");
    } else {
      setError("Aucun token reçu.");
    }
  };

  const handleClose = () => {
    setAdminPassword("");
    setError("");
    closeModals();
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={handleClose}>
          ✖
        </button>
        <h2>Espace formateur</h2>
        <form className="modal-form" onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Mot de passe administrateur"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
            required
          />

          {error && <p className="error-message">{error}</p>}

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
