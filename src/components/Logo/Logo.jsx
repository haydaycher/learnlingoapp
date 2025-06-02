import css from "./Logo.module.css";

import { Link } from "react-router-dom";
// import {
//   LOGO_WIDTH,
//   LOGO_HEIGHT,
//   LOGO_SPRITE_ID,
// } from "../../constants/logoConstants.js";

const Logo = () => (
  <Link to="/" className={css.logo}>
    <img
      src="/ukraine.svg"
      width={28} // жорстко прописано
      height={28} // жорстко прописано
      alt="Ukraine logo"
    />
        <p className={css.logo_text}>LearnLingo</p>
  </Link>
);

export default Logo;
