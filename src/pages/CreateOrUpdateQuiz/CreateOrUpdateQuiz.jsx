import { useEffect, useState } from "react";
import "./CreateOrUpdateQuiz.css";
import { useParams, useNavigate } from "react-router-dom";
import { getMostRecentQuizVersion } from "../../api/quiz";
import { useToast } from "../../contexts/ToastContext";
import CreateOrUpdateQuizHeader from "./components/CreateOrUpdateQuizHeader/CreateOrUpdateQuizHeader";
import Loader from "../../components/Loader/Loader";
import CreateOrUpdateQuizContent from "./components/CreateOrUpdateQuizContent/CreateOrUpdateQuizContent";
import { useAuth } from "../../contexts/AuthContext";

const CreateOrUpdateQuiz = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  //check if admin and redirect him to home if not
  // const userData = localStorage.getItem("userData");
  // const storedUserObj = JSON.parse(userData);

  const { userData, isLoading: authIsLoading } = useAuth();
  console.log(userData);
  if (!userData || !userData.isAdmin) {
    navigate("/");
    showToast("vous devez être administrateur pour pouvoir créer un quiz");
  }

  // useEffect(() => {
  //   if (authIsLoading) {
  //     if (!userData || !userData.isAdmin) {
  //       console.log("test3");

  //       navigate("/");
  //       showToast("vous devez être administrateur pour pouvoir créer un quiz");
  //     }
  //   }
  // }, [userData, navigate, showToast, authIsLoading]);

  const { quizId } = useParams();

  const [quiz, setQuiz] = useState({ title: "", questions: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log("quiz", quiz);

  useEffect(() => {
    if (quizId) {
      console.log("test2");

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
      {console.log("test4")}

      <CreateOrUpdateQuizHeader quiz={quiz} setQuiz={setQuiz} />
      <CreateOrUpdateQuizContent quiz={quiz} setQuiz={setQuiz} />
    </main>
  );
};
export default CreateOrUpdateQuiz;
