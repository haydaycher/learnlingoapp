// src/components/Header.jsx
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    await signOut(auth);
  };

  // Highlight active link
  const currentLocation = window.location.pathname;
  const menuItems = document.querySelectorAll("nav a");
  menuItems.forEach((link) => {
    if (link.getAttribute("href") === currentLocation.split("/").pop()) {
      link.classList.add("active");
    }
  });

  return (
    <section className={css.header}>
      <Logo />
      <Navigation />

      {currentUser ? (
        <div className={css.user_info}>
          <span className={css.username}>Welcome, {currentUser.email}</span>
          <button className={css.logout_btn} onClick={handleLogout}>
            Logout
          </button>
          <BurgerMenu />
        </div>
      ) : (
        <>
          {/* Десктопні кнопки */}
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

          {/* Мобільне меню */}
          <div className={css.mobileMenu}>
            <button
              className={css.menuBtn}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Menu"
            >
              ☰
            </button>
            {isMenuOpen && (
              <div className={css.dropdown}>
                <button
                  onClick={() => {
                    setIsLoginOpen(true);
                    setIsMenuOpen(false);
                  }}
                >
                  Log in
                </button>
                <button
                  onClick={() => {
                    setIsSignupOpen(true);
                    setIsMenuOpen(false);
                  }}
                >
                  Registration
                </button>
              </div>
            )}
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
    </section>
  );
};
