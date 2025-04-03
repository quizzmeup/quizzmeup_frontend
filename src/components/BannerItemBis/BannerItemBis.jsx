import "./BannerItemBis.css";

const BannerItemBis = ({ title, linkLabel, specialClass }) => {
  return (
    <div className={`banner-item ${specialClass}`}>
      <div>
        <span>{title}</span>
      </div>
      <span href="">{linkLabel}</span>
    </div>
  );
};

export default BannerItemBis;
