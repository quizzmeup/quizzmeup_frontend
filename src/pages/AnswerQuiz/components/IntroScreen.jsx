import "./IntroScreen.css";

const IntroScreen = ({ title, questionCount, onStart }) => {
  return (
    <div className="intro-screen">
      <h1 className="intro-title">{title}</h1>
      <p className="intro-count">
        {questionCount} question{questionCount > 1 ? "s" : ""}
      </p>
      <button className="auth-btn" onClick={onStart}>
        Commencer
      </button>
    </div>
  );
};

export default IntroScreen;
