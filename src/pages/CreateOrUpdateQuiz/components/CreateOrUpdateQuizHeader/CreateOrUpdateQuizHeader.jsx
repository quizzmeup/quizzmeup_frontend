import "./CreateOrUpdateQuizHeader.css";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../../routes";
import { IoIosArrowBack } from "react-icons/io";
import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
  delQuizVersionId,
  publishQuizVersionId,
  putQuizVersionId,
  postQuizVersionId,
} from "../../../../api/quizVersions";

import { postQuiz } from "../../../../api/quiz";

import { useToast } from "../../../../contexts/ToastContext";

const CreateOrUpdateQuizHeader = ({ quiz, setQuiz }) => {
  const [isLoading, setIsLoading] = useState(false);
  //const [data, setData] = useState();
  //const [dataQuiz, setDataQuiz] = useState();
  //const [dataQuizVersion, setDataQuizVersion] = useState();

  const navigate = useNavigate();
  const { showToast } = useToast();

  // fonction de creation d'un quiz
  const createNewQuiz = async () => {
    console.log("new quiz en cours   =>" + quiz.title);
    let dataQuiz;
    try {
      setIsLoading(true);
      dataQuiz = await postQuiz({ title: quiz.title });

      //console.log(await postQuiz({ title: quiz.title }));
      //console.log("setdataquiz renseigne");
      setIsLoading(false);
      return dataQuiz;
    } catch (error) {
      console.error(error);
    }
  };

  // fonction de creation d'un quizVersion
  const createNewQuizVersion = async (Id, quiz) => {
    //console.log("new quizVersion en cours   =>" + quiz.title);

    // console.log("quiz = " + quiz);

    try {
      console.log(" --------------------ID = " + Id);

      setIsLoading(true);
      await postQuizVersionId(Id, quiz);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleTitleChange = (event) => {
    setQuiz((prevState) => {
      return { ...prevState, title: event.target.value };
    });
  };

  // delete du quiz en cours + retour page backoffice
  const handleDeleteQuiz = async () => {
    try {
      setIsLoading(true);
      await delQuizVersionId(quiz._id);
      setIsLoading(false);
      showToast("Le quiz a bien été supprimé", "success");
      navigate(ROUTES.backoffice);
    } catch (error) {
      console.error(error);
    }
  };

  //TODO
  const handleSaveQuiz = () => {
    // putQuizVersionId
    // postQuizVersionId
    // si quizId est null => on est en mode creation de nouveau quiz (donc on cree d'abord un quiz puis un quizversion V1 avec l'id du quiz)
    // sinon on est en mode creation / edition de quizversion

    // mode edition
    if (quiz.quizId) {
      console.log("quiz.quizId = " + quiz.quizId);

      // si il existe des soumissions on cree un nouveau quizVersion en incrementant la version
      if (quiz.hasSubmissions) {
        // on repasse en mode creation
        //
        //
      } else {
        // on est en edition
      }

      //

      //

      // mode creation
    } else {
      // on cree le nouveau quiz
      const dataQuiz = createNewQuiz();
      console.log("new quiz crééééé");
      // on cree le nouveau quizVersion avec le titre V1

      setQuiz((prevState) => {
        const newQuiz = structuredClone(prevState);
        newQuiz.title = newQuiz.title + " V1";
        return newQuiz;
      });

      console.log("----- dataQuiz._id =" + dataQuiz._id);

      createNewQuizVersion(dataQuiz._id, quiz);

      console.log("new quizVersion crééééé");
    }
  };

  // flag le quiz comme publié
  const handlePublishQuiz = async () => {
    try {
      setIsLoading(true);
      await publishQuizVersionId(quiz._id);
      setIsLoading(false);
      showToast("Le quiz a bien été publié", "success");
    } catch (error) {
      console.error(error);
    }
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
      />
      <div className="button-header-createOrUpdateQuiz">
        <button onClick={handleDeleteQuiz}>Reset</button>
        <button onClick={handleSaveQuiz}>Sauvegarder</button>
        <button onClick={handlePublishQuiz}>Publier</button>
      </div>
    </div>
  );
};
export default CreateOrUpdateQuizHeader;
