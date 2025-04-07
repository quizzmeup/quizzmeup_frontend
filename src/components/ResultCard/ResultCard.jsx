import "./ResultCard.css";

const ResultCard = ({ title, actionLabel, specialClass }) => {
  return (
    <div className={`banner-item-bis ${specialClass}`}>
      <div>
        <span>{title}</span>
      </div>
      <span>{actionLabel}</span>
    </div>
  );
};

export default ResultCard;
