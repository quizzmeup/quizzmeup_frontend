import "./Home.css";
import { useAuth } from "../../contexts/AuthContext";
import { useState, useEffect } from "react";
import { getQuizzes } from "../../api/home";
import { ROUTES } from "../../routes";
import BannerItem from "../../components/BannerItem/BannerItem";
import Loader from "../../components/Loader/Loader";

const Home = () => {
  const { userData } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  const [availableQuizzes, setAvailableQuizzes] = useState([]);
  const [submittedQuizzes, setSubmittedQuizzes] = useState([]);

  // Fonction pour récupérer les quiz pour le user
  // quiz deja repondus + quiz dispos
  const fetchData = async () => {
    if (userData) {
      setIsLoading(true);
      try {
        const response = await getQuizzes();

        const allData = response.data;

        // on a null si pas de soumission ou l'id de la soumission dans le champ "submissionId"
        // on dispatch en 2 states
        const dataAvailable = allData.filter(
          (item) => item.submissionId === null
        );
        const dataSubmitted = allData.filter(
          (item) => item.submissionId !== null
        );

        setAvailableQuizzes(dataAvailable);
        setSubmittedQuizzes(dataSubmitted);
        setIsLoading(false);
      } catch (error) {
        console.error("Erreur lors du chargement :", error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [userData]);

  const getQuizDisplayStatus = () => {
    if (submittedQuizzes.length === 0 && availableQuizzes.length === 0) {
      return "none";
    } else if (submittedQuizzes.length === 0) {
      return "noSubmitted";
    } else if (availableQuizzes.length === 0) {
      return "noAvailable";
    }

    return "ok";
  };

  const status = getQuizDisplayStatus();

  return userData ? (
    <main className="container">
      <h1 className="quiz-title">Répondre à un questionnaire</h1>
      <div className="quiz-list">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {status === "noAvailable" ? (
              <p>Aucun quiz disponible.</p>
            ) : (
              availableQuizzes.length > 0 && (
                <>
                  <p>Liste des quiz disponibles</p>
                  {availableQuizzes.map((quiz, index) => (
                    <div className="quiz-line" key={index}>
                      <BannerItem
                        text={quiz.title}
                        specialClassDiv="back-div"
                        specialClassButton="back-button"
                        linkTo={ROUTES.answerQuiz.build(quiz.id)}
                      />
                    </div>
                  ))}
                </>
              )
            )}

            <br></br>
            <br></br>

            {status === "noSubmitted" ? (
              <p>Aucun quiz soumis</p>
            ) : (
              submittedQuizzes.length > 0 && (
                <>
                  <p>Liste des Quiz soumis</p>

                  {submittedQuizzes.map((quiz, index) => (
                    <div className="quiz-line" key={index}>
                      <BannerItem
                        text={quiz.title}
                        specialClassDiv="back-div"
                        specialClassButton="back-button"
                        linkTo={ROUTES.quizSubmissionShow.build(
                          quiz.submissionId
                        )}
                      />
                    </div>
                  ))}
                </>
              )
            )}

            {status === "none" && <p>Aucun quiz disponible ou soumis</p>}
          </>
        )}
      </div>
    </main>
  ) : (
    <div className="message container">
      <h1>
        Connecte-toi ou crée un compte avant de pouvoir profiter de QuizMeUp
      </h1>
    </div>
  );
};

export default Home;
