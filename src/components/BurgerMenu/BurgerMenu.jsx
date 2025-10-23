// src/components/BurgerMenu/BurgerMenu.jsx
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { UpdateProfileForm } from "../UpdateProfileForm/UpdateProfileForm";
import { SignUpForm } from "../SignUpForm/SignUpForm";
import css from "./BurgerMenu.module.css";

export const BurgerMenu = ({ currentUser, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // профіль
  const [isRegisterOpen, setIsRegisterOpen] = useState(false); // реєстрація

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const getLinkClass = ({ isActive }) =>
    isActive ? `${css.link} ${css.active}` : css.link;

  return (
    <div className={`${css.navigationBlock} ${!currentUser ? "guest" : ""}`}>
      {/* бургер */}
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
            <ul>
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
                        setIsModalOpen(true); // відкриває оновлення профілю
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
                <>
                  <li>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsRegisterOpen(true); // відкриває форму реєстрації
                        setIsOpen(false);
                      }}
                      className={css.link}
                    >
                      Sign Up
                    </a>
                  </li>
                </>
              )}
            </ul>
          </div>

          <div className={css.menuBackground}></div>
        </>
      )}

      {/* модалки */}
      {isModalOpen && (
        <UpdateProfileForm onClose={() => setIsModalOpen(false)} />
      )}

      {isRegisterOpen && (
        <SignUpForm onClose={() => setIsRegisterOpen(false)} />
      )}
    </div>
  );
};
