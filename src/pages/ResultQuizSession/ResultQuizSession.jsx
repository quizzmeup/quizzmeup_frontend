import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchSubmissionById } from "../../api/submission";
import Loader from "../../components/Loader/Loader";
import QuizQuestionResult from "./components/QuizQuestionResult";
import "./ResultQuizSession.css";

const ResultQuizSession = () => {
  const { id } = useParams();
  const [submission, setSubmission] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSubmission = async () => {
      try {
        const response = await fetchSubmissionById(id);
        setSubmission(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement de la soumission :", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadSubmission();
  }, [id]);

  if (isLoading) return <Loader />;
  if (!submission) return <p>Soumission introuvable.</p>;

  const { quizVersion, user, cohort, score, answers } = submission;

  return (
    <section className="rqs-section">
      <div className="rqs-header">
        <h2 className="rqs-title">
          Formulaire :{" "}
          <span className="rqs-quiz-title">{quizVersion.title}</span>
        </h2>

        <div className="rqs-meta">
          <p className="rqs-user-cohort">Promo : {cohort.name}</p>
          <p className="rqs-user-name">Utilisateur : {user.name}</p>

          <div className="rqs-score-box">
            <span className="rqs-score-label">Score :</span>
            <span className="rqs-score-value">
              {score} / {answers.length}
            </span>
          </div>
        </div>
      </div>

      <div className="rqs-answers-list">
        {answers.map((answer, index) => (
          <QuizQuestionResult key={index} index={index + 1} answer={answer} />
        ))}
      </div>
    </section>
  );
};

export default ResultQuizSession;
