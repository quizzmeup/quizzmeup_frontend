import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IntroScreen from "./components/IntroScreen";
import QuestionDisplay from "./components/QuestionDisplay";
import ConfirmationModal from "./components/ConfirmationModal";
import { fetchQuizShow, fetchMostRecentQuizVersion } from "../../api/quiz";
import { createSubmission } from "../../api/submission";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useToast } from "../../contexts/ToastContext";
import { ROUTES } from "../../routes";
import { handleApiError } from "../../utils/apiErrorHandler"; // ou où que tu l'aies mis
import "./AnswerQuiz.css";

const AnswerQuiz = () => {
  const { quizId } = useParams();
  const { userData } = useAuth();
  const { showToast } = useToast();

  const navigate = useNavigate();

  const [quiz, setQuiz] = useState(null); // { title, questionsCount }
  const [quizVersion, setQuizVersion] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null); // null = pas encore commencé
  const [answers, setAnswers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // au chargement initial, on récupère juste title + questionsCount
  useEffect(() => {
    const loadQuizInfo = async () => {
      try {
        const res = await fetchQuizShow(quizId);
        setQuiz(res.data);
      } catch (error) {
        console.error("Erreur lors du chargement du quiz :", error);
      }
    };
    loadQuizInfo();
  }, [quizId]);

  const handleStart = async () => {
    try {
      const res = await fetchMostRecentQuizVersion(quizId);
      const version = res.data;
      setQuizVersion(version);
      setAnswers(
        version.questions.map((q) => ({
          question: q._id,
          submittedAnswers: [],
        }))
      );
      setCurrentIndex(0);
    } catch (error) {
      console.error("Erreur lors du chargement de la version du quiz :", error);
    }
  };

  const handleConfirmSubmission = async () => {
    const cohortId = userData?.cohorts?.[0]?._id;

    if (!cohortId) {
      setIsModalOpen(false);
      showToast(
        "Vous n'êtes affilié à aucune promotion, la soumission est impossible.",
        {
          type: "error",
        }
      );
      return;
    }

    try {
      setIsSubmitting(true);

      const payload = {
        cohort: cohortId,
        answers,
      };

      const res = await createSubmission(quizVersion._id, payload);
      const submissionId = res.data._id;

      navigate(`/submissions/${submissionId}`);
    } catch (error) {
      console.error("Erreur lors de la soumission :", error);
      showToast(
        `Erreur lors de la soumission : ${handleApiError(error)}`,
        "error"
      );
      setIsModalOpen(false);
      setIsSubmitting(false);
    }
  };

  const updateAnswer = (questionId, submittedAnswers) => {
    setAnswers((prev) =>
      prev.map((a) =>
        a.question === questionId ? { ...a, submittedAnswers } : a
      )
    );
  };

  // 👉 Préparation des données pour QuestionDisplay
  const currentQuestion = quizVersion?.questions?.[currentIndex];
  const totalQuestions = quizVersion?.questions?.length || 0;
  const currentAnswers = answers?.[currentIndex]?.submittedAnswers || [];

  const handleChangeAnswer = (submittedAnswers) => {
    if (!currentQuestion) return;
    updateAnswer(currentQuestion._id, submittedAnswers);
  };

  const goToPrevious = () => {
    setCurrentIndex((i) => Math.max(0, i - 1));
  };

  const goToNext = () => {
    setCurrentIndex((i) => (i + 1 < totalQuestions ? i + 1 : i));
  };

  const isLast = currentIndex === totalQuestions - 1;

  return (
    <div className="container">
      <div className="answer-quiz-page">
        <div className="answer-quiz-container">
          {currentIndex === null ? (
            quiz && (
              <IntroScreen
                title={quiz.title}
                questionCount={quiz.questionsCount}
                onStart={handleStart}
              />
            )
          ) : (
            <>
              {quizVersion && currentIndex < quizVersion.questions.length && (
                <QuestionDisplay
                  question={currentQuestion}
                  answerControl={{
                    value: currentAnswers,
                    onChange: handleChangeAnswer,
                  }}
                  navigation={{
                    index: currentIndex,
                    total: totalQuestions,
                    goToPrevious,
                    goToNext,
                    isLast,
                  }}
                  openModal={() => setIsModalOpen(true)}
                />
              )}

              {isModalOpen && (
                <ConfirmationModal
                  onConfirm={handleConfirmSubmission}
                  onCancel={() => setIsModalOpen(false)}
                  isSubmitting={isSubmitting}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnswerQuiz;
