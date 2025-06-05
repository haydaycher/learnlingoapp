// src/components/Header.jsx
import { signOut } from "firebase/auth";
import Logo from "../Logo/Logo.jsx";
import { auth } from "../../firebase/config";
import { useAuth } from "../AuthProvider/AuthProvider";
import Navigation from "../Navigation/Navigation.jsx";
import { LoginForm } from "../LoginForm/LoginForm.jsx";
import { BurgerMenu } from "../BurgerMenu/BurgerMenu";
import css from "./Header.module.css";

export const Header = () => {
  const { currentUser } = useAuth();

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <section className={css.header}>
      <Logo />
      <Navigation />

      {currentUser ? (
        <>
          <span>Welcome, {currentUser.email}</span>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <div className={css.burgerWrapper}>
          <BurgerMenu />
        </div>
      )}
    </section>
  );
};
