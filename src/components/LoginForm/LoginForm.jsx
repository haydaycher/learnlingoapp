import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import css from "./LoginForm.module.css";
import { Eye, EyeOff } from "lucide-react";

export const LoginForm = ({ onClose, onSwitchForm }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      if (onClose) onClose();
      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <form className={css.login_form} onSubmit={handleLogin}>
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
          tabIndex={-1}
        >
          {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
        </button>
      </div>

      <button className={css.login_form_button} type="submit">
        Log In
      </button>

      <p className={css.switch_text}>
        Don’t have an account?{" "}
        <button
          type="button"
          className={css.switch_link}
          onClick={onSwitchForm}
        >
          Sign Up
        </button>
      </p>
    </form>
  );
};
