import "./CreateOrUpdateQuizHeader.css";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../../routes";
import { IoIosArrowBack } from "react-icons/io";
import { createContext, useContext, useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { delQuizVersionId } from "../../../../api/quizVersions";

const ToastContext = createContext();

const CreateOrUpdateQuizHeader = ({ quiz, setQuiz }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const handleTitleChange = (event) => {
    setQuiz((prevState) => {
      return { ...prevState, title: event.target.value };
    });
  };

  const handleDeleteQuiz = async () => {
    try {
      console.log(quiz);

      setIsLoading(true);
      await delQuizVersionId(quiz._id);
      setData(null);
      setIsLoading(false);
      navigate(ROUTES.backoffice);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
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
        />
        <div className="button-header-createOrUpdateQuiz">
          {/* <button disabled onClick={handleDeleteQuiz}> */}
          <button onClick={handleDeleteQuiz}>Reset</button>
          <button disabled>Sauvegarder</button>
          <button disabled>Publier</button>
        </div>
      </div>
      {toast && (
        <div className={`toast toast-${toast.type}`}>{toast.message}</div>
      )}
    </ToastContext.Provider>
  );
};
export default CreateOrUpdateQuizHeader;
