import { useEffect, useState } from "react";
import "./CreateOrUpdateQuiz.css";
import { useParams, useNavigate } from "react-router-dom";
import { getMostRecentQuizVersion } from "../../api/quiz";
import { useToast } from "../../contexts/ToastContext";

const CreateOrUpdateQuiz = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const { quiz_id } = useParams();

  const [error, setError] = useState(null);
  const [questions, setQuestions] = useState(null);
  console.log(questions);

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
        setQuestions(data.questions);
      };
      fetchMostRecentQuizVersion();
    } else {
      //initialize questions for create a new quiz
      setQuestions([]);
    }
  }, [quiz_id, setError, navigate, showToast]);

  return <main className="createOrUpdateQuiz container">plop</main>;
};
export default CreateOrUpdateQuiz;
