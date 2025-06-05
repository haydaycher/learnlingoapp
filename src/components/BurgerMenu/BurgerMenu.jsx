// src/components/BurgerMenu/BurgerMenu.jsx
import { useState } from "react";
import { NavLink } from "react-router-dom";
import css from "./BurgerMenu.module.css";

export const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className={css.navigationBlock}>
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
                <NavLink to="/" onClick={toggleMenu}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/teachers" onClick={toggleMenu}>
                  Teachers
                </NavLink>
              </li>
            </ul>
          </div>
          <div className={css.menuBackground}></div>
        </>
      )}
    </div>
  );
};
