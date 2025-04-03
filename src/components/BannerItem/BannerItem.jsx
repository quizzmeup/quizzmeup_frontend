import "./BannerItem.css";
import { RxOpenInNewWindow } from "react-icons/rx";

const BannerItem = ({ text, specialClassDiv, specialClassButton }) => {
  return (
    <div className="banner-item">
      <div className={`banner-div ${specialClassDiv}`}>
        <span>{text}</span>
      </div>
      <button className={`open-button ${specialClassButton}`}>
        <RxOpenInNewWindow />
      </button>
    </div>
  );
};

export default BannerItem;
