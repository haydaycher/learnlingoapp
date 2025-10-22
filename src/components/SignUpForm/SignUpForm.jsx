import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase/config";
import css from "./SignUpForm.module.css";
import { Eye, EyeOff } from "lucide-react";

export const SignUpForm = (onClose) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // додаємо displayName
      await updateProfile(userCredential.user, {
        displayName: name,
      });

      alert("Registration successful");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <form autoComplete="off" className={css.sign_form} onSubmit={handleSignUp}>
      <button type="button" className={css.closeBtn} onClick={onClose}>
        <img src="/x.svg" alt="close" />
      </button>
      <h1 className={css.sign_h}>Registration</h1>
      <p className={css.sign_p}>
        Thank you for your interest in our platform! In order to register, we
        need some information. Please provide us with the following information
      </p>

      <input
        className={css.sign_form_input}
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        className={css.sign_form_input}
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <div className={css.password_wrapper}>
        <input
          className={css.sign_form_input}
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

      <button className={css.sign_form_button} type="submit">
        Sign Up
      </button>
    </form>
  );
};
