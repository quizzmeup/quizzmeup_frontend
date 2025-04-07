import "./ResultCard.css";
import { Link } from "react-router-dom";

const ResultCard = ({ title, actionLabel, specialClass, linkTo }) => {
  return (
    <Link to={linkTo} style={{ textDecoration: "none", color: "black" }}>
      <div className={`result-card ${specialClass}`}>
        <span>{title}</span>
        <span>{actionLabel}</span>
      </div>
    </Link>
  );
};

export default ResultCard;
