import "./BannerItemBis.css";

const BannerItemBis = ({ title, linkLabel, specialClass }) => {
  return (
    <div className={`banner-item-bis ${specialClass}`}>
      <div>
        <span>{title}</span>
      </div>
      <span>{linkLabel}</span>
    </div>
  );
};

export default BannerItemBis;
