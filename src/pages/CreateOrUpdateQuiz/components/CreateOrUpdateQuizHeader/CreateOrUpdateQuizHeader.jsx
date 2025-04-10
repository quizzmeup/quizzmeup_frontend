import "./CreateOrUpdateQuizHeader.css";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../routes";
import { IoIosArrowBack } from "react-icons/io";
import { LuTrash2 } from "react-icons/lu";
import { useState } from "react";
import Loader from "../../../../components/Loader/Loader";
import { useToast } from "../../../../contexts/ToastContext";
import { handleApiError } from "../../../../utils/apiErrorHandler";

import {
  submitQuizVersion,
  destroyQuizVersionAndRedirect,
  publishQuizVersionWithFeedback,
} from "../../../../services/quizVersionActions";

const CreateOrUpdateQuizHeader = ({ quizVersion, setQuizVersion }) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleTitleChange = (event) => {
    setQuizVersion((prev) => ({ ...prev, title: event.target.value }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await submitQuizVersion({ quizVersion, setQuizVersion, showToast });
    } catch (error) {
      console.error(error);
      showToast(handleApiError(error), "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await destroyQuizVersionAndRedirect({
        quizVersion,
        navigate,
        showToast,
      });
    } catch (error) {
      console.error(error);
      showToast(handleApiError(error), "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePublish = async () => {
    setIsLoading(true);
    try {
      await publishQuizVersionWithFeedback({
        quizVersionId: quizVersion._id,
        showToast,
      });
    } catch (error) {
      console.error(error);
      showToast(handleApiError(error), "error");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div className="header-create-or-update-quiz">
      <Link to={ROUTES.backoffice}>
        <IoIosArrowBack /> Back-office
      </Link>

      <input
        aria-label="Titre du quiz"
        type="text"
        name="title"
        placeholder="Veuillez renseigner le nom de votre quiz"
        value={quizVersion.title}
        onChange={handleTitleChange}
        disabled={quizVersion.quizId}
      />

      <div className="button-header-create-or-update-quiz">
        {quizVersion.quizId && (
          <button className="auth-btn logout" onClick={handleDelete}>
            <LuTrash2 size={20} />
          </button>
        )}
        <button className="auth-btn" onClick={handleSubmit}>
          Sauvegarder
        </button>
        <button className="auth-btn" onClick={handlePublish}>
          Publier
        </button>
      </div>
    </div>
  );
};

export default CreateOrUpdateQuizHeader;
