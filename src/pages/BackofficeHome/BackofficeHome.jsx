import BannerItem from "../../components/BannerItem/BannerItem";
import Loader from "../../components/Loader/Loader";
import ResultCard from "../../components/ResultCard/ResultCard";
import { Navigate, useNavigate } from "react-router-dom";
import "./BackofficeHome.css";
import { FaPlus } from "react-icons/fa6";
import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { getQuizzes } from "../../api/quiz";
import { ROUTES } from "../../routes";

const BackofficeHome = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  const { token } = useAuth();

  let isAdmin;

  const storedUser = localStorage.getItem("userData");
  if (storedUser) {
    const obj = JSON.parse(storedUser);
    isAdmin = obj.isAdmin;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setData(await getQuizzes());
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return token && isAdmin ? (
    isLoading ? (
      <Loader />
    ) : (
      <div className="backoffice-home container">
        <div className="backoffice-quiz">
          <h2>Formulaires</h2>
          <div>
            <div
              className="new-form"
              onClick={() => navigate(ROUTES.quizCreate)}
            >
              <FaPlus />
              <span>Nouveau formulaire</span>
            </div>
            {data &&
              data.map((quiz) => {
                return (
                  <ResultCard
                    title={quiz.title}
                    key={quiz.id}
                    actionLabel="Editer"
                    specialClass="shadowed"
                    linkTo={ROUTES.quizEdit.build(quiz.id)}
                  />
                );
              })}
          </div>
        </div>
        <div className="backoffice-consult">
          <h2>Résultats</h2>
          <div className="consult">
            <BannerItem
              text="> Consulter par formulaire"
              specialClassDiv="back-home-div"
              specialClassButton="back-home-button"
              linkTo={ROUTES.searchQuizzes}
            />
            <BannerItem
              text="> Consulter par utilisateur"
              specialClassDiv="back-home-div"
              specialClassButton="back-home-button"
              linkTo={ROUTES.searchUsers}
            />
          </div>
        </div>

        <div className="backoffice-cohorts">
          <h2>Sessions</h2>
          <div className="cohort-manager-link">
            <BannerItem
              text="> Gérer les Sessions"
              specialClassDiv="back-home-div"
              specialClassButton="back-home-button"
              linkTo={ROUTES.cohortManager}
            />
          </div>
        </div>
      </div>
    )
  ) : (
    <Navigate to={ROUTES.home} />
  );
};

export default BackofficeHome;
