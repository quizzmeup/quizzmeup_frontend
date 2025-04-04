import "./BannerItemBis.css";

const BannerItemBis = ({ title, linkLabel, specialClass, onClick }) => {
  return (
    <div className={`banner-item-bis ${specialClass}`} onClick={onClick}>
      <div>
        <span>{title}</span>
      </div>
      <span>{linkLabel}</span>
    </div>
  );
};

export default BannerItemBis;
