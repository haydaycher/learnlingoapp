import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";
import clsx from "clsx";

const generateNavLinkClass = ({ isActive }) => {
  return clsx(css.nav_item, isActive && css.active_link);
};

export default function Navigation() {
  return (
    <nav className={css.nav_container}>
      <ul className={css.nav_list}>
        <li>
          <NavLink to="/" className={generateNavLinkClass}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/teachers" className={generateNavLinkClass}>
            Teachers
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
