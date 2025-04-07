import "./ResultCard.css";

const ResultCard = ({ title, actionLabel, specialClass, onClick }) => {
  return (
    <div className={`result-card ${specialClass}`}>
      <span>{title}</span>
      <span>{actionLabel}</span>
    </div>
  );
};

export default ResultCard;
