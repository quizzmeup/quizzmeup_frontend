import Button from "../../components/Button/Button";
import OpenButton from "../../components/OpenButton/OpenButton";
import ResultsConsult from "../../components/ResultsConsult/ResultsConsult";
import { Link } from "react-router-dom";
import "./BackofficeHome.css";

const BackofficeHome = () => {
  return (
    <div className="backoffice-home">
      <div className="backoffice-quiz">
        <h2>Formulaires</h2>
        <Button text="+ Nouveau formulaire" />
      </div>
      <div className="backoffice-consult">
        <h2>Résultats</h2>
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
  );
};

export default BackofficeHome;
