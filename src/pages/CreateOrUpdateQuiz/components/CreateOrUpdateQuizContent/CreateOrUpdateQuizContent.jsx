import "./CreateOrUpdateQuizContent.css";
import AddQuestionButton from "../AddQuestionButton/AddQuestionButton";
import CreateQuestion from "../createQuestion/CreateQuestion";

const CreateOrUpdateQuizContent = ({ quiz, setQuiz }) => {
  return (
    <div className="create-or-update-quiz-container">
      <h2>
        Questions du quiz <span>Personaliser le formulaire</span>
      </h2>
      {quiz.questions.map((question, index) => {
        let lastIndex = false;
        if (quiz.questions.length - 1 === index) {
          lastIndex = true;
        }
        return (
          <CreateQuestion
            key={index}
            question={question}
            setQuiz={setQuiz}
            index={index}
            lastIndex={lastIndex}
          />
        );
      })}

      <AddQuestionButton setQuiz={setQuiz} />
    </div>
  );
};
export default CreateOrUpdateQuizContent;
