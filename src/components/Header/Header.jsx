// src/components/Header.jsx
import { useState } from "react";
import { signOut } from "firebase/auth";
import Logo from "../Logo/Logo.jsx";
import { auth } from "../../firebase/config";
import { useAuth } from "../AuthProvider/AuthProvider";
import Navigation from "../Navigation/Navigation.jsx";
import { LoginForm } from "../LoginForm/LoginForm.jsx";
import { SignUpForm } from "../SignUpForm/SignUpForm.jsx";
import { Modal } from "../Modal/Modal.jsx";
import { BurgerMenu } from "../BurgerMenu/BurgerMenu";
import css from "./Header.module.css";

export const Header = () => {
  const { currentUser } = useAuth();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <section className={css.header}>
      <Logo />
      <Navigation />

      {currentUser ? (
        <>
          <span>Welcome, {currentUser.email}</span>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <div className={css.authButtons}>
          <button
            className={css.authButtonLog}
            onClick={() => setIsLoginOpen(true)}
          >
            <img
              src="/log-in-enter.svg"
              alt="Log In Icon"
              width="20"
              height="20"
              className={css.authButtonIcon}
            />
            Log in
          </button>

          <button
            className={css.authButtonReg}
            onClick={() => setIsSignupOpen(true)}
          >
            Registration
          </button>
        </div>
      )}

      <BurgerMenu
        onLoginClick={() => setIsLoginOpen(true)}
        onSignupClick={() => setIsSignupOpen(true)}
      />

      {/* Modals */}
      <Modal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)}>
        <LoginForm />
      </Modal>

      <Modal isOpen={isSignupOpen} onClose={() => setIsSignupOpen(false)}>
        <SignUpForm />
      </Modal>
    </section>
  );
};
