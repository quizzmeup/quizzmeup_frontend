import { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [activeModal, setActiveModal] = useState(null); // "login", "signup", "admin" or null

  const openSignupModal = () => setActiveModal("signup");
  const openLoginModal = () => setActiveModal("login");
  const openAdminModal = () => setActiveModal("admin");
  const closeModals = () => setActiveModal(null);

  return (
    <ModalContext.Provider
      value={{
        isSignupModalOpen: activeModal === "signup",
        isLoginModalOpen: activeModal === "login",
        isAdminModalOpen: activeModal === "admin",
        openSignupModal,
        openLoginModal,
        openAdminModal,
        closeModals,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
