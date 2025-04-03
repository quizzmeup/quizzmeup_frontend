import "./BannerItem.css";
import { RxOpenInNewWindow } from "react-icons/rx";
import { Link } from "react-router-dom";

const BannerItem = ({ text, specialClassDiv, specialClassButton, linkTo }) => {
  return (
    <div className="banner-item">
      <div className={`banner-div ${specialClassDiv}`}>
        <span>{text}</span>
      </div>
      <Link to={linkTo}>
        <button className={`open-button ${specialClassButton}`}>
          <RxOpenInNewWindow />
        </button>
      </Link>
    </div>
  );
};

export default BannerItem;
