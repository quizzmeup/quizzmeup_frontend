import "./QuestionDisplay.css";
import AnswerField from "./AnswerField";
import QuestionNavigator from "./QuestionNavigator";

const QuestionDisplay = ({
  question,
  answerControl,
  navigation,
  openModal,
}) => {
  const { value: currentAnswers, onChange } = answerControl;
  const { index, total, goToPrevious, goToNext, isLast } = navigation;

  return (
    <div className="question-display">
      <div className="question-header">
        <p className="question-progress">
          Question {index + 1} / {total}
        </p>
        <h2 className="question-title">{question.title}</h2>
        {question.markdownCode && (
          <pre className="question-code">
            <code>{question.markdownCode}</code>
          </pre>
        )}
      </div>

      <AnswerField
        question={question}
        currentAnswers={currentAnswers}
        onChange={onChange}
      />

      <QuestionNavigator
        index={index}
        goToPrevious={goToPrevious}
        goToNext={goToNext}
        isLast={isLast}
        openModal={openModal}
      />
    </div>
  );
};

export default QuestionDisplay;
