import "./CreateQuestion.css";
import QuestionHeader from "./components/QuestionHeader/QuestionHeader";
import QuestionPoints from "./components/QuestionPoints/QuestionsPoints";
import QuestionAnswers from "./components/QuestionsAnswers/QuestionAnswers";

const CreateQuestion = ({ index, lastIndex, question, setQuiz }) => {
  return (
    <div className="created-question">
      <QuestionHeader
        index={index}
        lastIndex={lastIndex}
        question={question}
        setQuiz={setQuiz}
      />
      <QuestionPoints question={question} setQuiz={setQuiz} index={index} />
      <QuestionAnswers question={question} setQuiz={setQuiz} index={index} />
    </div>
  );
};
export default CreateQuestion;
