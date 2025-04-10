import "./CreateOrUpdateQuizContent.css";
import AddQuestionButton from "../AddQuestionButton/AddQuestionButton";
import CreateQuestion from "../createQuestion/CreateQuestion";

const CreateOrUpdateQuizContent = ({ quizVersion, setQuizVersion }) => {
  return (
    <div className="create-or-update-quiz-container">
      <h2>
        Questions du quiz <span>Personnaliser le formulaire</span>
      </h2>
      {quizVersion.questions.map((question, index) => {
        const isLastIndex = quizVersion.questions.length - 1 === index;

        return (
          <CreateQuestion
            key={index}
            question={question}
            setQuizVersion={setQuizVersion}
            index={index}
            isLastIndex={isLastIndex}
          />
        );
      })}

      <AddQuestionButton setQuizVersion={setQuizVersion} />
    </div>
  );
};
export default CreateOrUpdateQuizContent;
