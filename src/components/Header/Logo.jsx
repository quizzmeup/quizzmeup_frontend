import "./Logo.css";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link className="logo-link" to="/">
      <img
        src="/logo-marvel-nicosek.png"
        alt="Marvel by NicoSek"
        className="logo"
      />
    </Link>
  );
};

export default Logo;
