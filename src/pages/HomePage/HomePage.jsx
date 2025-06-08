import { FaUsers, FaStar, FaBook, FaGlobe, FaLanguage } from "react-icons/fa";
// іконки з FontAwesome
import { Header } from "../../components/Header/Header";
import css from "./HomePage.module.css";
import { Link } from "react-router-dom";
import back1x from "../../assets/back1x.webp";
import back2x from "../../assets/back2x.webp";

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

        <div className={css.imageWrapper}>
          <picture>
            {/* Десктоп: від 1025px і більше */}
            <source
              srcSet={`${back1x} 1x, ${back2x} 2x`}
              media="(min-width: 1025px)"
              type="image/webp"
            />

            {/* Планшет: 768px–1024px */}
            <source
              srcSet={`${back1x} 1x, ${back2x} 2x`}
              media="(min-width: 768px) and (max-width: 1024px)"
              type="image/webp"
            />

            {/* Мобільні: <768px */}
            <img
              src={back1x}
              srcSet={`${back1x} 1x, ${back2x} 2x`}
              alt="Language learning illustration"
              className={css.hero_img}
              loading="lazy"
            />
          </picture>

          <Link to="/teachers">
            <button className={css.home_main_btn}>Get started</button>
          </Link>
          {/* Декоративна іконка */}
          <FaLanguage className={css.decorIcon} />
        </div>
      </div>
      <div className={css.additional_info}>
        <ul className={css.stats_list}>
          <li>
            <FaUsers className={css.home_icon} />
            <span>32,000+ Experienced tutors</span>
          </li>
          <li>
            <FaStar className={css.home_icon} />
            <span>300,000+ 5-star tutor reviews</span>
          </li>
          <li>
            <FaBook className={css.home_icon} />
            <span>120+ Subjects taught</span>
          </li>
          <li>
            <FaGlobe className={css.home_icon} />
            <span>200+ Tutor nationalities</span>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default HomePage;
