import "./Logo.css";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link className="logo-link" to="/">
      <img src="/logo.png" alt="Logo du Réacteur" className="logo" />
    </Link>
  );
};

export default Logo;
