import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { QUIZZMEUP_FRONTEND_AUTH_TOKEN_COOKIE_NAME } from "../config";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialisation au chargement de l'app
  useEffect(() => {
    const storedToken = Cookies.get(QUIZZMEUP_FRONTEND_AUTH_TOKEN_COOKIE_NAME);
    const storedUser = localStorage.getItem("userData");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUserData(JSON.parse(storedUser));
    }

    setIsLoading(false); // Fin du chargement
  }, []);

  const handleLogin = (token, userData) => {
    Cookies.set(QUIZZMEUP_FRONTEND_AUTH_TOKEN_COOKIE_NAME, token, {
      expires: 3,
    });
    localStorage.setItem("userData", JSON.stringify(userData));
    setToken(token);
    setUserData(userData);
  };

  const handleLogout = () => {
    Cookies.remove(QUIZZMEUP_FRONTEND_AUTH_TOKEN_COOKIE_NAME);
    localStorage.removeItem("userData");
    setToken(null);
    setUserData(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        userData,
        setUserData,
        handleLogin,
        handleLogout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
