import { FaUsers, FaStar, FaBook, FaGlobe, FaLanguage } from "react-icons/fa";
// іконки з FontAwesome
import css from "./HomePage.module.css";
import { Link } from "react-router-dom";
import girl1x from "../../assets/girl1x.webp";
import girl2x from "../../assets/girl2x.webp";

const HomePage = () => {
  return (
    <section className={css.section}>
      <div className={css.home_section}>
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
        </div>
        <div className={css.imageWrapper}>
          <picture>
            <source
              srcSet={`${girl1x} 1x, ${girl2x} 2x`}
              media="(min-width: 1422px)"
              type="image/webp"
            />
            <source
              srcSet={`${girl1x} 1x, ${girl2x} 2x`}
              media="(min-width: 768px) and (max-width: 1421px)"
              type="image/webp"
            />
            <img
              src={girl1x}
              srcSet={`${girl1x} 1x, ${girl2x} 2x`}
              alt="Language learning illustration"
              className={css.hero_img}
              loading="lazy"
            />
          </picture>

          <Link to="/teachers">
            <button type="button" className={css.home_main_btn}>
              Get started
            </button>
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
