import "./Header.css";
import Logo from "./Logo";
import AuthButtons from "./AuthButtons";

const Header = () => {
  return (
    <header className="header">
      <Logo />
      <AuthButtons />
    </header>
  );
};

export default Header;
