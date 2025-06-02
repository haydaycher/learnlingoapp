import { Header } from "../../components/Header/Header";
import css from "./HomePage.module.css";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <section className={css.section}>
      <div className={css.home_container}>
        <h1 className={css.home_title}>
          Unlock your potential with the best
          <span className={css.highlighted}>language </span> tutors
        </h1>
        <p className={css.home_moto}>
          Embark on an Exciting Language Journey with Expert Language Tutors:
          Elevate your language proficiency to new heights by connecting with
          highly qualified and experienced tutors.
        </p>
        <Link to="/teachers">
          <button className={css.home_main_btn}>Get started</button>
        </Link>
      </div>
    </section>
  );
};

export default HomePage;
