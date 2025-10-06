import { useState } from "react";
import { NavLink } from "react-router-dom";
import css from "./BurgerMenu.module.css";

export const BurgerMenu = ({ currentUser, onProfileClick, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const getLinkClass = ({ isActive }) =>
    isActive ? `${css.link} ${css.active}` : css.link;

  return (
    <div className={`${css.navigationBlock} ${!currentUser ? "guest" : ""}`}>
      {/* кнопка-бургер / хрестик */}
      <div className={css.hamburgerMenu} onClick={toggleMenu}>
        <div
          className={`${css.bar} ${css.upperBar} ${isOpen ? css.open : ""}`}
        ></div>
        <div
          className={`${css.bar} ${css.middleBar} ${isOpen ? css.hidden : ""}`}
        ></div>
        <div
          className={`${css.bar} ${css.lowerBar} ${isOpen ? css.open : ""}`}
        ></div>
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

              {currentUser && (
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
                        onProfileClick?.();
                        toggleMenu();
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
              )}
            </ul>
          </div>

          <div className={css.menuBackground}></div>
        </>
      )}
    </div>
  );
};
