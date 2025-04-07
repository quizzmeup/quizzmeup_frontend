import "./Home.css";
import { useAuth } from "../../contexts/AuthContext";
import { useState, useEffect } from "react";
import { getQuizzes } from "../../api/home";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes";
import BannerItem from "../../components/BannerItem/BannerItem";
import Loader from "../../components/Loader/Loader";

const Home = () => {
  const { userData } = useAuth();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fonction pour récupérer les quiz
  // quiz deja repondus  + quiz dispos
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await getQuizzes();

      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Erreur lors du chargement :", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const navigate = useNavigate();

  return isLoading ? (
    <Loader />
  ) : userData ? (
    <main className="container">
      <h1 className="quiz-title">Répondre à un questionnaire</h1>
      <div className="quiz-list">
        {data && data.length > 0 ? (
          data.map((elem, index) => (
            <div className="quiz-line" key={index}>
              <BannerItem
                text={elem.title}
                specialClassDiv="back-div"
                specialClassButton="back-button"
                linkTo={ROUTES.quiz + "/" + elem.id}
              />
            </div>
          ))
        ) : (
          <h1>Aucun formulaire disponible 😢</h1>
        )}
      </div>
    </main>
  ) : (
    <div className="message">
      <h1>
        Connecte-toi ou crée un compte avant de pouvoir profiter de QuizMeUp
      </h1>
    </div>
  );
};

export default Home;
