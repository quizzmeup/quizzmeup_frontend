import { useAuth } from "../../contexts/AuthContext";
import "./Home.css";

const Home = () => {
  const { userData } = useAuth();

  return (
    <div className="home">
      <h1>Bienvenue sur quizzmeup_frontend !</h1>
      {userData ? (
        <p className="welcome">Heureux de te revoir, {userData.firstName || userData.email} 👋</p>
      ) : (
        <p className="welcome">Connecte-toi ou crée un compte pour commencer à jouer !</p>
      )}
    </div>
  );
};

export default Home;
