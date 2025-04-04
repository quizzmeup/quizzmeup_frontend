import { useEffect, useState } from "react";
import "./CreateOrUpdateQuiz.css";
import { useParams, useNavigate } from "react-router-dom";
import { getMostRecentQuizVersion } from "../../api/quiz";
import { useToast } from "../../contexts/ToastContext";
import CreateOrUpdateQuizHeader from "./components/CreateOrUpdateQuizHeader/CreateOrUpdateQuizHeader";
import Loader from "../../components/Loader/Loader";

const CreateOrUpdateQuiz = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const { quiz_id } = useParams();

  const [quiz, setQuiz] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log(quiz);

  useEffect(() => {
    //check if admin and redirect him to home if not
    const userData = localStorage.getItem("userData");
    const storedUserObj = JSON.parse(userData);

    if (!storedUserObj || !storedUserObj.isAdmin) {
      navigate("/");
      showToast("vous devez être administrateur pour pouvoir créer un quiz");
    }

    if (quiz_id) {
      //initialize questions for update a quiz
      const fetchMostRecentQuizVersion = async () => {
        const data = await getMostRecentQuizVersion(quiz_id, setError);
        setQuiz(data);
      };
      fetchMostRecentQuizVersion();
      setIsLoading(false);
    } else {
      //initialize questions for create a new quiz
      setQuiz({ title: "", questions: [] });
      setIsLoading(false);
    }
  }, [quiz_id, setError, navigate, showToast]);

  return isLoading ? (
    <main className="createOrUpdateQuiz container">
      <Loader />
    </main>
  ) : (
    <main className="createOrUpdateQuiz container">
      <CreateOrUpdateQuizHeader quiz={quiz} setQuiz={setQuiz} />
    </main>
  );
};
export default CreateOrUpdateQuiz;
