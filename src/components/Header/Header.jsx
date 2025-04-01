import "./Header.css";
import Logo from "./Logo";
import AuthButtons from "./AuthButtons";

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-title">
          <Logo />
          <h1>QuizMeUp</h1>
        </div>
        <AuthButtons />
      </div>
    </header>
  );
};

export default Header;
