import "./QuizQuestionResult.css";
import QcmAnswers from "./QcmAnswers";
import FreeAnswers from "./FreeAnswers";

const QuizQuestionResult = ({ index, answer }) => {
  const { question, submittedAnswers, score } = answer;
  const {
    title,
    markdownCode,
    points,
    rightAnswers,
    propositions = [],
  } = question;

  const isCorrect = score > 0;
  const isQcm = propositions.length > 0;

  return (
    <div
      className={`qqr-wrapper ${isCorrect ? "qqr-correct" : "qqr-incorrect"}`}
    >
      <div className="qqr-header">
        <div className="qqr-index">{index}</div>
        <h3 className="qqr-title">{title}</h3>
        <div className="qqr-score">
          {score} / {points}
        </div>
      </div>

      {markdownCode && (
        <pre className="qqr-code-block">
          <code>{markdownCode}</code>
        </pre>
      )}

      {isQcm ? (
        <QcmAnswers
          propositions={propositions}
          submittedAnswers={submittedAnswers}
          rightAnswers={rightAnswers}
        />
      ) : (
        <FreeAnswers
          submittedAnswers={submittedAnswers}
          rightAnswers={rightAnswers}
          isCorrect={isCorrect}
        />
      )}
    </div>
  );
};

export default QuizQuestionResult;
