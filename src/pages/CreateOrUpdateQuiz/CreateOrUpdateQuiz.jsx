import { useEffect, useState } from "react";
import "./CreateOrUpdateQuiz.css";
import { useParams, Navigate } from "react-router-dom";
import { getMostRecentQuizVersionWithUnpublished } from "../../api/quiz";
import CreateOrUpdateQuizHeader from "./components/CreateOrUpdateQuizHeader/CreateOrUpdateQuizHeader";
import Loader from "../../components/Loader/Loader";
import CreateOrUpdateQuizContent from "./components/CreateOrUpdateQuizContent/CreateOrUpdateQuizContent";
import { useAuth } from "../../contexts/AuthContext";
import { handleApiError } from "../../utils/apiErrorHandler";

const CreateOrUpdateQuiz = () => {
  const { userData } = useAuth();

  const { quizId } = useParams();

  const [quizVersion, setQuizVersion] = useState({ title: "", questions: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (quizId) {
      //initialize questions for update a quiz
      const fetchMostRecentQuizVersion = async () => {
        try {
          const data = await getMostRecentQuizVersionWithUnpublished(quizId);
          setQuizVersion(data);
        } catch (error) {
          setError(handleApiError(error));
        } finally {
          setIsLoading(false);
        }
      };
      fetchMostRecentQuizVersion();
    } else {
      setIsLoading(false);
    }
  }, [quizId]);

  //Redirection if user is not admin
  if (!userData || !userData.isAdmin) {
    return <Navigate to={"/"} />;
  }

  return isLoading ? (
    <main className="create-or-update-quiz container">
      <Loader />
    </main>
  ) : error ? (
    <main className="create-or-update-quiz container">
      <div className="error">{error}</div>
    </main>
  ) : (
    <main className="create-or-update-quiz container">
      <CreateOrUpdateQuizHeader
        quizVersion={quizVersion}
        setQuizVersion={setQuizVersion}
        quizId={quizId}
      />
      <CreateOrUpdateQuizContent
        quizVersion={quizVersion}
        setQuizVersion={setQuizVersion}
      />
    </main>
  );
};
export default CreateOrUpdateQuiz;
