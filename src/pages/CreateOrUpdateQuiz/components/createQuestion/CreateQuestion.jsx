import "./CreateQuestion.css";
import QuestionHeader from "./components/QuestionHeader/QuestionHeader";
import QuestionPoints from "./components/QuestionPoints/QuestionsPoints";
import QuestionAnswers from "./components/QuestionsAnswers/QuestionAnswers";

const CreateQuestion = ({ index, isLastIndex, question, setQuizVersion }) => {
  return (
    <div className="create-question">
      <QuestionHeader
        index={index}
        isLastIndex={isLastIndex}
        question={question}
        setQuizVersion={setQuizVersion}
      />
      <QuestionPoints
        question={question}
        setQuizVersion={setQuizVersion}
        index={index}
      />
      <QuestionAnswers
        question={question}
        setQuizVersion={setQuizVersion}
        index={index}
      />
    </div>
  );
};
export default CreateQuestion;
