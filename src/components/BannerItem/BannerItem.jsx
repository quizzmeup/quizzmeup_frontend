import "./BannerItem.css";
import { FaExternalLinkAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const BannerItem = ({ text, specialClassDiv, specialClassButton, linkTo }) => {
  return (
    <div className="banner-item">
      <div className={`banner-div ${specialClassDiv}`}>
        <span>{text}</span>
      </div>
      <Link to={linkTo}>
        <button className={`open-button ${specialClassButton}`}>
          <FaExternalLinkAlt />
        </button>
      </Link>
    </div>
  );
};

export default BannerItem;
