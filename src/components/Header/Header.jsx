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
import { UpdateProfileForm } from "../UpdateProfileForm/UpdateProfileForm.jsx";
import css from "./Header.module.css";

export const Header = () => {
  const { currentUser } = useAuth();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = async () => {
    await signOut(auth);
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

      <Navigation />

      {currentUser ? (
        <BurgerMenu
          currentUser={currentUser}
          onProfileClick={() => setIsProfileOpen(true)}
          onLogout={handleLogout}
        />
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

      {/* Modals */}
      <Modal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)}>
        <LoginForm />
      </Modal>

      <Modal isOpen={isSignupOpen} onClose={() => setIsSignupOpen(false)}>
        <SignUpForm />
      </Modal>

      <Modal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)}>
        <UpdateProfileForm />
      </Modal>
    </section>
  );
};
