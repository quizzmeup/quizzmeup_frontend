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
  const navigate = useNavigate();
  const { showToast } = useToast();

  const incrementVersion = (title) => {
    const parts = title.split(" ");
    const lastPart = parts[parts.length - 1];

    if (lastPart.startsWith("v") && !isNaN(parseInt(lastPart.slice(1)))) {
      const number = parseInt(lastPart.slice(1), 10) + 1;
      parts[parts.length - 1] = "v" + number;
    } else {
      parts.push("v1");
    }

    return parts.join(" ");
  };

  // fonction de creation d'un quiz
  const createNewQuiz = async () => {
    try {
      setIsLoading(true);
      const dataQuiz = await postQuiz({ title: quiz.title });
      setIsLoading(false);
      return dataQuiz; // on retourne l'id du quiz créé
    } catch (error) {
      console.error(error);
    }
  };

  // fonction de creation d'un quizVersion
  const createNewQuizVersion = async (Id, quiz) => {
    try {
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

  const handleSaveQuiz = async () => {
    // putQuizVersionId
    // postQuizVersionId
    // si quizId est null => on est en mode creation de nouveau quiz (donc on cree d'abord un quiz puis un quizversion V1 avec l'id du quiz)
    // sinon on est en mode creation / edition de quizversion

    // mode edition
    if (quiz.quizId) {
      // si il existe des soumissions on cree un nouveau quizVersion en incrementant la version
      if (quiz.hasSubmissions) {
        // on cree le nouveau quizVersion avec le titre vX + 1
        const newQuizVersion = structuredClone(quiz);
        newQuizVersion.title = incrementVersion(newQuizVersion.title);
        // on vide les id des questions, c'est regénéré par le back
        newQuizVersion.questions.forEach((question) => {
          question._id = null;
        });

        setQuiz(newQuizVersion);
        createNewQuizVersion(newQuizVersion.quizId, newQuizVersion);
        showToast(
          "Le quiz a bien été sauvegardé dans sa nouvelle version",
          "success"
        );
      } else {
        // on est en edition
        // TODO
        //
        //
        //
        //
      }
      // mode creation
    } else {
      // on cree le nouveau quiz
      const newQuiz = await createNewQuiz();
      // on cree le nouveau quizVersion avec le titre v1
      const newQuizVersion = structuredClone(quiz);
      newQuizVersion.title = incrementVersion(newQuizVersion.title);
      setQuiz(newQuizVersion);
      createNewQuizVersion(newQuiz._id, newQuizVersion);
      showToast("Le quiz a bien été créé", "success");
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
