import "./ConfirmationModal.css";

const ConfirmationModal = ({ onConfirm, onCancel, isSubmitting }) => {
  return (
    <div className="modal-overlay">
      <div className="confirmation-modal">
        <p className="modal-message">
          Es-tu sûr de vouloir envoyer ta soumission ? <br />
          Cette action est <strong>irréversible</strong>.
        </p>
        <div className="modal-actions">
          <button className="auth-btn danger" onClick={onCancel}>
            Annuler
          </button>
          <button
            className="auth-btn"
            onClick={onConfirm}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Envoi en cours..." : "Confirmer"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
