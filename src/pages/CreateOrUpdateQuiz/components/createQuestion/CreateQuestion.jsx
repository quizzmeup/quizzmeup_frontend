import "./CreateQuestion.css";
import QuestionHeader from "./components/QuestionHeader/QuestionHeader";
import QuestionPoints from "./components/QuestionPoints/QuestionsPoints";
import QuestionAnswers from "./components/QuestionsAnswers/QuestionAnswers";

const CreateQuestion = ({ index, isLastIndex, question, setQuiz }) => {
  return (
    <div className="create-question">
      <QuestionHeader
        index={index}
        isLastIndex={isLastIndex}
        question={question}
        setQuiz={setQuiz}
      />
      <QuestionPoints question={question} setQuiz={setQuiz} index={index} />
      <QuestionAnswers question={question} setQuiz={setQuiz} index={index} />
    </div>
  );
};
export default CreateQuestion;
