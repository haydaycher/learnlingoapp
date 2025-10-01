// src/components/SignUpForm.jsx
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import css from "./SignUpForm.module.css";

export const SignUpForm = () => {
  // const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Registration successful");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <form className={css.sign_form} onSubmit={handleSignUp}>
      <input
        className={css.sign_form_input}
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        className={css.sign_form_input}
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button className={css.sign_form_button} type="submit">
        Sign Up
      </button>
    </form>
  );
};
