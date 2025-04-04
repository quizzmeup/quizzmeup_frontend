import "./QcmAnswers.css";

const QcmAnswers = ({ propositions, submittedAnswers, rightAnswers }) => {
  return (
    <ul className="qcm-propositions">
      {propositions.map((prop, i) => {
        const isSubmitted = submittedAnswers.includes(prop);
        const isCorrect = rightAnswers.includes(prop);

        const isError = isSubmitted && !isCorrect;

        return (
          <li
            key={i}
            className={`qcm-proposition
              ${isCorrect ? "qcm-correct-proposition" : ""}
              ${isError ? "qcm-wrong-answer" : ""}
            `}
          >
            <span className="qcm-checkbox">
              <span
                className={`qcm-bullet ${isSubmitted ? "qcm-checked" : ""}`}
              />
            </span>
            <span>{prop}</span>
          </li>
        );
      })}
    </ul>
  );
};

export default QcmAnswers;
