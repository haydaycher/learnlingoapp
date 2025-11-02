// src/components/BurgerMenu/BurgerMenu.jsx
import { useState, useEffect } from "react"; // ← додай useEffect
import { NavLink } from "react-router-dom";
import { UpdateProfileForm } from "../UpdateProfileForm/UpdateProfileForm";
import { SignUpForm } from "../SignUpForm/SignUpForm";
import css from "./BurgerMenu.module.css";

export const BurgerMenu = ({ currentUser, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const getLinkClass = ({ isActive }) =>
    isActive ? `${css.link} ${css.active}` : css.link;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // блокує прокрутку сторінки
    } else {
      document.body.style.overflow = ""; // повертає звичайну прокрутку
    }

    return () => {
      document.body.style.overflow = ""; // очищення при демонтажі
    };
  }, [isOpen]);
  // ↑↑↑

  return (
    <div className={`${css.navigationBlock} ${!currentUser ? "guest" : ""}`}>
      <div className={css.hamburgerMenu} onClick={toggleMenu}>
        <div
          className={`${css.bar} ${css.upperBar} ${isOpen ? css.open : ""}`}
        />
        <div
          className={`${css.bar} ${css.middleBar} ${isOpen ? css.hidden : ""}`}
        />
        <div
          className={`${css.bar} ${css.lowerBar} ${isOpen ? css.open : ""}`}
        />
      </div>

      {isOpen && (
        <>
          <div className={css.menuList}>
            <ul className={css.menu_ul}>
              <li>
                <NavLink to="/" onClick={toggleMenu} className={getLinkClass}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/teachers"
                  onClick={toggleMenu}
                  className={getLinkClass}
                >
                  Teachers
                </NavLink>
              </li>

              {currentUser ? (
                <>
                  <li>
                    <NavLink
                      to="/favorites"
                      onClick={toggleMenu}
                      className={getLinkClass}
                    >
                      Favorites
                    </NavLink>
                  </li>
                  <li>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsModalOpen(true);
                        setIsOpen(false);
                      }}
                      className={css.link}
                    >
                      Edit Profile
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        onLogout?.();
                        toggleMenu();
                      }}
                      className={css.link}
                    >
                      Logout
                    </a>
                  </li>
                </>
              ) : (
                <li>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsRegisterOpen(true);
                      setIsOpen(false);
                    }}
                    className={css.link}
                  >
                    Sign Up
                  </a>
                </li>
              )}
            </ul>
          </div>

          <div
            className={css.menuBackground}
            onClick={() => setIsOpen(false)}
          ></div>
        </>
      )}

      {isModalOpen && (
        <UpdateProfileForm onClose={() => setIsModalOpen(false)} />
      )}
      {isRegisterOpen && (
        <SignUpForm onClose={() => setIsRegisterOpen(false)} />
      )}
    </div>
  );
};
