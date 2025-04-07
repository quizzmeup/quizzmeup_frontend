import { useEffect, useState } from "react";
import "./CreateOrUpdateQuiz.css";
import { useParams, useNavigate } from "react-router-dom";
import { getMostRecentQuizVersion } from "../../api/quiz";
import { useToast } from "../../contexts/ToastContext";
import CreateOrUpdateQuizHeader from "./components/CreateOrUpdateQuizHeader/CreateOrUpdateQuizHeader";
import Loader from "../../components/Loader/Loader";
import CreateOrUpdateQuizContent from "./components/CreateOrUpdateQuizContent/CreateOrUpdateQuizContent";

const CreateOrUpdateQuiz = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  //check if admin and redirect him to home if not
  const userData = localStorage.getItem("userData");
  const storedUserObj = JSON.parse(userData);

  if (!storedUserObj || !storedUserObj.isAdmin) {
    navigate("/");
    showToast("vous devez être administrateur pour pouvoir créer un quiz");
  }

  const { quizId } = useParams();

  const [quiz, setQuiz] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log("quiz", quiz);

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
      //initialize questions for create a new quiz
      setQuiz({ title: "", questions: [] });
      setIsLoading(false);
    }
  }, [quizId, setError, navigate, showToast]);

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
      <CreateOrUpdateQuizHeader quiz={quiz} setQuiz={setQuiz} />
      <CreateOrUpdateQuizContent quiz={quiz} setQuiz={setQuiz} />
    </main>
  );
};
export default CreateOrUpdateQuiz;
