import "./CreateOrUpdateQuizContent.css";
import AddQuestionButton from "../AddQuestionButton/AddQuestionButton";
import CreateQuestion from "../createQuestion/CreateQuestion";

const CreateOrUpdateQuizContent = ({ quiz, setQuiz }) => {
  return (
    <div className="create-or-update-quiz-container">
      <h2>
        Questions du quiz <span>Personnaliser le formulaire</span>
      </h2>
      {quiz.questions.map((question, index) => {
        const isLastIndex = quiz.questions.length - 1 === index;

        return (
          <CreateQuestion
            key={index}
            question={question}
            setQuiz={setQuiz}
            index={index}
            isLastIndex={isLastIndex}
          />
        );
      })}

      <AddQuestionButton setQuiz={setQuiz} />
    </div>
  );
};
export default CreateOrUpdateQuizContent;
