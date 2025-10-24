// src/components/Modal/Modal.jsx
import css from "./Modal.module.css";

export const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className={css.backdrop} onClick={onClose}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <button type="button" className={css.closeBtn} onClick={onClose}>
          <img src="/x.svg" alt="close" />
        </button>
        {children}
      </div>
    </div>
  );
};
