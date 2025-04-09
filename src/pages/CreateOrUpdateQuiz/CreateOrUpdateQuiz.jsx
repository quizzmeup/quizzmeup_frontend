import { useEffect, useState } from "react";
import "./CreateOrUpdateQuiz.css";
import { useParams, Navigate } from "react-router-dom";
import { getMostRecentQuizVersion } from "../../api/quiz";
import CreateOrUpdateQuizHeader from "./components/CreateOrUpdateQuizHeader/CreateOrUpdateQuizHeader";
import Loader from "../../components/Loader/Loader";
import CreateOrUpdateQuizContent from "./components/CreateOrUpdateQuizContent/CreateOrUpdateQuizContent";
import { useAuth } from "../../contexts/AuthContext";

const CreateOrUpdateQuiz = () => {
  const { userData } = useAuth();

  const { quizId } = useParams();

  const [quiz, setQuiz] = useState({ title: "", questions: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  // console.log("quiz", quiz);

  useEffect(() => {
    if (quizId) {
      //initialize questions for update a quiz
      const fetchMostRecentQuizVersion = async () => {
        const data = await getMostRecentQuizVersion(quizId, setError);
        setQuiz(data);
        setIsLoading(false);
      };
      fetchMostRecentQuizVersion();
    } else {
      setIsLoading(false);
    }
  }, [quizId, setError]);

  //Redirection if user is not admin
  if (!userData || !userData.isAdmin) {
    return <Navigate to={"/"} />;
  }

  return isLoading ? (
    <main className="createOrUpdateQuiz container">
      <Loader />
    </main>
  ) : error ? (
    <main className="createOrUpdateQuiz container">
      <div className="error">{error}</div>
    </main>
  ) : (
    <main className="createOrUpdateQuiz container">
      <CreateOrUpdateQuizHeader quiz={quiz} setQuiz={setQuiz} quizId={quizId} />
      <CreateOrUpdateQuizContent quiz={quiz} setQuiz={setQuiz} />
    </main>
  );
};
export default CreateOrUpdateQuiz;
