// src/components/Header.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import Logo from "../Logo/Logo.jsx";
import { auth } from "../../firebase/config";
import { useAuth } from "../AuthProvider/AuthProvider";
import Navigation from "../Navigation/Navigation.jsx";
import { LoginForm } from "../LoginForm/LoginForm.jsx";
import { SignUpForm } from "../SignUpForm/SignUpForm.jsx";
import { Modal } from "../Modal/Modal.jsx";
import { BurgerMenu } from "../BurgerMenu/BurgerMenu";
import { UpdateProfileForm } from "../UpdateProfileForm/UpdateProfileForm.jsx";
import css from "./Header.module.css";

export const Header = () => {
  const { currentUser } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  const username =
    currentUser?.displayName || currentUser?.email?.split("@")[0];

  return (
    <section className={css.header}>
      <div className={css.leftBlock}>
        <Logo />
        {currentUser && (
          <span className={css.username}>Hi there, {username}</span>
        )}
      </div>

      <div className={css.navWrapper}>
        <Navigation />
      </div>

      {currentUser ? (
        <BurgerMenu
          currentUser={currentUser}
          onProfileClick={() => setIsProfileOpen(true)}
          onLogout={handleLogout}
        />
      ) : (
        <>
          <button
            className={css.mobileLoginBtn}
            onClick={() => {
              setIsLoginMode(true);
              setAuthModalOpen(true);
            }}
          >
            <img
              src="/log-in-enter.svg"
              alt="Log In"
              width="20"
              height="20"
              className={css.authButtonIcon}
            />
          </button>

          <div className={css.authButtons}>
            <button
              className={css.authButtonLog}
              onClick={() => {
                setIsLoginMode(true);
                setAuthModalOpen(true);
              }}
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
              onClick={() => {
                setIsLoginMode(false);
                setAuthModalOpen(true);
              }}
            >
              Registration
            </button>
          </div>
        </>
      )}

      {/* Єдина модалка для логіну і реєстрації */}
      <Modal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)}>
        {isLoginMode ? (
          <LoginForm
            onClose={() => setAuthModalOpen(false)}
            onSwitchForm={() => setIsLoginMode(false)} // Перемикає на Sign Up
          />
        ) : (
          <SignUpForm
            onClose={() => setAuthModalOpen(false)}
            onSwitchForm={() => setIsLoginMode(true)} // Перемикає на Log In
          />
        )}
      </Modal>

      <Modal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)}>
        <UpdateProfileForm />
      </Modal>
    </section>
  );
};
