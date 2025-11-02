import { useState } from "react";
import { Modal } from "../Modal/Modal";
import { LoginForm } from "../LoginForm/LoginForm";
import { SignUpForm } from "../SignUpForm/SignUpForm";

export const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true); // true = форма логіну, false = реєстрації

  const handleSwitchForm = () => setIsLogin(!isLogin);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {isLogin ? (
        <LoginForm onClose={onClose} onSwitchForm={handleSwitchForm} />
      ) : (
        <SignUpForm onClose={onClose} onSwitchForm={handleSwitchForm} />
      )}
    </Modal>
  );
};
