import "./QuestionNavigator.css";

const QuestionNavigator = ({
  index,
  goToPrevious,
  goToNext,
  isLast,
  openModal,
}) => {
  return (
    <div className="question-nav">
      <button
        className="auth-btn"
        onClick={goToPrevious}
        disabled={index === 0}
      >
        Précédent
      </button>

      {!isLast ? (
        <button className="auth-btn" onClick={goToNext}>
          Suivant
        </button>
      ) : (
        <button className="auth-btn" onClick={openModal}>
          Soumettre
        </button>
      )}
    </div>
  );
};

export default QuestionNavigator;
