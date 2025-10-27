// src/components/LoginForm.jsx
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import css from "./LoginForm.module.css";
import { Eye, EyeOff } from "lucide-react";

export const LoginForm = (onClose) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Logged in!");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <form className={css.login_form} onSubmit={handleLogin}>
      {/* <button type="button" className={css.closeBtn} onClick={onClose}>
        <img src="/x.svg" alt="close" />
      </button> */}
      <h1 className={css.login_h}>Log In</h1>
      <p className={css.login_p}>
        Welcome back! Please enter your credentials to access your account and
        continue your search for a teacher.
      </p>
      <input
        className={css.login_form_input}
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <div className={css.password_wrapper}>
        <input
          className={css.login_form_input}
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="button"
          className={css.eye_button}
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
        </button>
      </div>

      <button className={css.login_form_button} type="submit">
        Log In
      </button>
    </form>
  );
};
