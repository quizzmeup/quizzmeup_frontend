import Header from "../Header/Header";
import SignupModal from "../SignupModal/SignupModal";
import LoginModal from "../LoginModal/LoginModal";
import Loader from "../Loader/Loader";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "./Layout.css";

const Layout = () => {
  const { isLoading } = useAuth();

  return (
    <>
      <Header />
      <SignupModal />
      <LoginModal />
      {isLoading ? (
        <div className="layout-loader-wrapper">
          <Loader />
        </div>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default Layout;
