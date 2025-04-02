import OpenButton from "../../components/OpenButton/OpenButton";
import ResultsConsult from "../../components/ResultsConsult/ResultsConsult";
import { Navigate } from "react-router-dom";
import "./BackofficeHome.css";
import { FaPlus } from "react-icons/fa6";
import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { getQuizzes } from "../../api/quiz";

const BackofficeHome = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  const { token } = useAuth();

  let isAdmin;

  const storedUser = localStorage.getItem("userData");
  if (storedUser) {
    const obj = JSON.parse(storedUser);
    isAdmin = obj.isAdmin;
  }

  let quiz;

  useEffect(() => {
    const fetchData = async () => {
      try {
        quiz = await getQuizzes(setData);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return token && isAdmin ? (
    isLoading ? (
      <p>Chargement</p>
    ) : (
      <div className="backoffice-home container">
        <div className="backoffice-quiz">
          <h2>Formulaires</h2>
          <div>
            <div className="new-form">
              <FaPlus />
              <span>Nouveau formulaire</span>
            </div>
            {data.map((quiz) => {
              return (
                <div key={quiz._id} className="quiz-label">
                  <span>{quiz.title}</span>
                  <a>Editer</a>
                </div>
              );
            })}
          </div>
        </div>
        <div className="backoffice-consult">
          <h2>Résultats</h2>
          <div className="consult">
            <div>
              <ResultsConsult text="> Consulter par formulaire" />
              <OpenButton />
            </div>
            <div>
              <ResultsConsult text="> Consulter par utilisateur" />
              <OpenButton />
            </div>
          </div>
        </div>
      </div>
    )
  ) : (
    <Navigate to="/" />
  );
};

export default BackofficeHome;
