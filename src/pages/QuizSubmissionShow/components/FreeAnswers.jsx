import "./FreeAnswers.css";

const FreeAnswers = ({ submittedAnswers, rightAnswers, isCorrect }) => {
  return (
    <div className="fa-free-answers">
      <p className="fa-label">Votre réponse :</p>
      {submittedAnswers.map((rep, i) => (
        <div
          key={i}
          className={`fa-answer ${
            isCorrect ? "fa-right-answer" : "fa-wrong-answer"
          }`}
        >
          {rep}
        </div>
      ))}

      <p className="fa-label">Bonne réponse :</p>
      {rightAnswers.map((rep, i) => (
        <div key={i} className="fa-answer fa-right-answer">
          {rep}
        </div>
      ))}
    </div>
  );
};

export default FreeAnswers;
