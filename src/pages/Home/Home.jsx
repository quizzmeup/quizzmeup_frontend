import { useAuth } from "../../contexts/AuthContext";
import "./Home.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { getQuizzes } from "../../api/home";
import { useNavigate } from "react-router-dom";

import { FaExternalLinkAlt } from "react-icons/fa";

const Home = () => {
  const { userData } = useAuth();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fonction pour récupérer les quiz
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await getQuizzes();
      //const response = await axios.get("http://localhost:3000/api/quizzes");

      setData(response.data);

      //console.log(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Erreur lors du chargement :", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/backoffice/backoffice");
  };

  return !userData ? (
    <main className="container">
      <div className="formulaire">
        <h1 className="titre">Répondre à un questionnaire</h1>
      </div>
      <div className="formulaire">
        {data && data.length > 0 ? (
          data.map((elem, index) => (
            <div className="line_formulaire" key={index}>
              <h2>{elem.title}</h2>

              <div className="line_formulaire" onClick={handleClick}>
                <FaExternalLinkAlt size={30} color="white" />
              </div>
              <button className="auth-btn" onClick={handleClick}>
                Clique moi
              </button>
            </div>
          ))
        ) : (
          <p>Connecte-toi ou crée un compte avant toute chose, merci</p>
        )}
      </div>
    </main>
  ) : (
    <div>tata</div>
  );
};

export default Home;
