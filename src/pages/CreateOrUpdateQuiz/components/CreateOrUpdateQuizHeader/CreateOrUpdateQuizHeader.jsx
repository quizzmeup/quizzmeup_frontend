import "./CreateOrUpdateQuizHeader.css";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../../routes";
import { IoIosArrowBack } from "react-icons/io";
import { LuTrash2 } from "react-icons/lu";

const CreateOrUpdateQuizHeader = ({ quiz, setQuiz, quizId }) => {
  const handleTitleChange = (event) => {
    setQuiz((prevState) => {
      return { ...prevState, title: event.target.value };
    });
  };

  const handleDeleteQuiz = () => {
    setQuiz((prevState) => {
      const newObj = structuredClone(prevState);

      newObj.title = "";
      newObj.questions = [];

      return newObj;
    });
  };

  return (
    <div className={"header-CreateOrUpdateQuiz"}>
      <Link to={ROUTES.backoffice}>
        <IoIosArrowBack /> Formulaire
      </Link>
      <input
        aria-label="Titre du quiz"
        type="text"
        name="title"
        placeholder="Veuillez renseigner le nom de votre quiz"
        value={quiz.title}
        onChange={handleTitleChange}
        disabled={quizId}
      />
      <div className="button-header-createOrUpdateQuiz">
        <button disabled className="auth-btn logout" onClick={handleDeleteQuiz}>
          <LuTrash2 size={20} />
        </button>
        <button className="auth-btn" disabled>
          Sauvegarder
        </button>
        <button className="auth-btn" disabled>
          Publier
        </button>
      </div>
    </div>
  );
};
export default CreateOrUpdateQuizHeader;
