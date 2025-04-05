import "./CreateOrUpdateQuizContent.css";
import { LuFileSpreadsheet } from "react-icons/lu";
import { FaCheck } from "react-icons/fa6";
import CreateQuestion from "../createQuestion/CreateQuestion";

const CreateOrUpdateQuizContent = ({ quiz, setQuiz }) => {
  return (
    <div className="content-createOrUpdateQuiz">
      <h2>
        Questions <span>Personaliser le formulaire</span>
      </h2>
      {quiz.questions.map((question, index) => (
        <CreateQuestion
          key={question._id}
          question={question}
          setQuiz={setQuiz}
          index={index}
          lastIndex={quiz.questions.length - 1}
        />
      ))}

      <div className="buttons-add-question">
        <button>
          <LuFileSpreadsheet /> Ajouter une question Texte
        </button>
        <button>
          <FaCheck /> Ajouter une question QCM
        </button>
      </div>
    </div>
  );
};
export default CreateOrUpdateQuizContent;
