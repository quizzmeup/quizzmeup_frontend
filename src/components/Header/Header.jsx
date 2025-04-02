import "./Header.css";
import Logo from "./Logo";
import AuthButtons from "./AuthButtons";

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <Logo />
        <AuthButtons />
      </div>
    </header>
  );
};

export default Header;
