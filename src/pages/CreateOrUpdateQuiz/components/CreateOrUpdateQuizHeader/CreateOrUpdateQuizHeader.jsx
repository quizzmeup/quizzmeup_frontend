import "./CreateOrUpdateQuizHeader.css";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../../routes";
import { IoIosArrowBack } from "react-icons/io";

const CreateOrUpdateQuizHeader = ({ quiz, setQuiz }) => {
  console.log(quiz);

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
    <div className="header-CreateOrUpdateQuiz">
      <Link to={ROUTES.backoffice}>
        <IoIosArrowBack /> Formulaire
      </Link>
      <input
        type="text"
        name="title"
        placeholder="Veuillez renseigner le nom de votre quiz"
        value={quiz.title}
        onChange={handleTitleChange}
      />
      <div className="button-header-createOrUpdateQuiz">
        <button onClick={handleDeleteQuiz}>Reset</button>
        <button>Sauvegarder</button>
        <button>Publier</button>
      </div>
    </div>
  );
};
export default CreateOrUpdateQuizHeader;
