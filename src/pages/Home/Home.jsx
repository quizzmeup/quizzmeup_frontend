import { useAuth } from "../../contexts/AuthContext";
import "./Home.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { getQuizzes } from "../../api/home";

const Home = () => {
  const { userData } = useAuth();

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fonction pour récupérer les quiz
  const fetchData = async () => {
    //console.log("appel a fetchdata");

    setIsLoading(true);
    try {
      const response = await getQuizzes();
      //const response = await axios.get("http://localhost:3000/api/quizzes");

      //      console.log("retour api ok");

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

  const handleClick = () => {};

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
