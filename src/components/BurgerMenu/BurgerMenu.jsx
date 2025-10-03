// src/components/BurgerMenu/BurgerMenu.jsx
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import css from "./BurgerMenu.module.css";

export const BurgerMenu = ({ currentUser, onProfileClick, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const getLinkClass = ({ isActive }) =>
    isActive ? `${css.link} ${css.active}` : css.link;

  return (
    <div className={`${css.navigationBlock} ${!currentUser ? "guest" : ""}`}>
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

              {/* Favorites */}
              {currentUser && (
                <li>
                  <button
                    onClick={() => {
                      navigate("/favorites");
                      toggleMenu();
                    }}
                    style={{
                      display: "block",
                      width: "100%",
                      padding: "10px 20px",
                      border: "none",
                      background: "none",
                      textAlign: "left",
                      cursor: "pointer",
                      fontWeight: 500,
                      color: "#333",
                    }}
                  >
                    Favorites
                  </button>
                </li>
              )}

              {/* Edit Profile */}
              {currentUser && onProfileClick && (
                <li>
                  <button
                    onClick={() => {
                      onProfileClick();
                      toggleMenu();
                    }}
                    style={{
                      display: "block",
                      width: "100%",
                      padding: "10px 20px",
                      border: "none",
                      background: "none",
                      textAlign: "left",
                      cursor: "pointer",
                      fontWeight: 500,
                      color: "#333",
                    }}
                  >
                    Edit Profile
                  </button>
                </li>
              )}

              {/* Logout */}
              {currentUser && onLogout && (
                <li>
                  <button
                    onClick={() => {
                      onLogout();
                      toggleMenu();
                    }}
                    style={{
                      display: "block",
                      width: "100%",
                      padding: "10px 20px",
                      border: "none",
                      background: "none",
                      textAlign: "left",
                      cursor: "pointer",
                      fontWeight: 500,
                      color: "#333",
                    }}
                  >
                    Logout
                  </button>
                </li>
              )}
            </ul>
          </div>
          <div className={css.menuBackground}></div>
        </>
      )}
    </div>
  );
};
