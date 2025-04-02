import OpenButton from "../../components/OpenButton/OpenButton";
import ResultsConsult from "../../components/ResultsConsult/ResultsConsult";
import { Link } from "react-router-dom";
import "./BackofficeHome.css";
import { FaPlus } from "react-icons/fa6";
import { useState, useEffect } from "react";
import axios from "axios";
import { quiz } from "../../api/quiz";

const BackofficeHome = () => {
  const [isLoading, setIsLoading] = useState(true);

  let data;

  useEffect(() => {
    const fetchData = async () => {
      try {
        data = await quiz();
        console.log(data);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, []);

  return (
    // isLoading ? (
    //   <p>Chargement</p>
    // ) :
    <div className="backoffice-home container">
      <div className="backoffice-quiz">
        <h2>Formulaires</h2>
        <div>
          <div className="new-form">
            <FaPlus />
            <span>Nouveau formulaire</span>
          </div>
          {/* {data.map((quiz) => {
            return (
              <div key={quiz._id} className="quiz-label">
                <span>{quiz.title}</span>
                <a>Editer</a>
              </div>
            );
          })} */}
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
  );
};

export default BackofficeHome;
