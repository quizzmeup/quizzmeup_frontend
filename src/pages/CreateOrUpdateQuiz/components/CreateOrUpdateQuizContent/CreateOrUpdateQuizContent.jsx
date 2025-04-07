import "./CreateOrUpdateQuizContent.css";
import AddQuestionButton from "../AddQuestionButton/AddQuestionButton";
import CreateQuestion from "../createQuestion/CreateQuestion";

const CreateOrUpdateQuizContent = ({ quiz, setQuiz }) => {
  return (
    <div className="content-createOrUpdateQuiz">
      <h2>
        Questions <span>Personaliser le formulaire</span>
      </h2>
      {quiz.questions.map((question, index) => (
        <CreateQuestion
          key={index}
          question={question}
          setQuiz={setQuiz}
          index={index}
          lastIndex={quiz.questions.length - 1}
        />
      ))}

      <AddQuestionButton setQuiz={setQuiz} />
    </div>
  );
};
export default CreateOrUpdateQuizContent;
