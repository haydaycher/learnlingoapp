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
      {/* Лівий блок: Логотип + Username */}
      <div className={css.leftBlock}>
        <Logo />
        {currentUser && (
          <span className={css.username}>Hi there, {username}</span>
        )}
      </div>

      {/* Центрований блок навігації */}
      <div className={css.navWrapper}>
        <Navigation />
      </div>

      {/* Правий блок: BurgerMenu або кнопки авторизації */}
      {/* Правий блок: BurgerMenu або кнопки авторизації */}
      {currentUser ? (
        <BurgerMenu
          currentUser={currentUser}
          onProfileClick={() => setIsProfileOpen(true)}
          onLogout={handleLogout}
        />
      ) : (
        <>
          {/* Мобільна кнопка для логіну */}
          <button
            className={css.mobileLoginBtn}
            onClick={() => setIsLoginOpen(true)}
          >
            <img
              src="/log-in-enter.svg"
              alt="Log In"
              width="20"
              height="20"
              className={css.authButtonIcon}
            />
          </button>

          {/* Стандартні кнопки (ті, що були у твоєму коді) */}
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
        </>
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
