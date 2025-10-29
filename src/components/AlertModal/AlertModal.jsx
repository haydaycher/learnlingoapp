import React, { useEffect, useState } from "react";
import { Modal } from "../Modal/Modal";
import css from "./AlertModal.module.css";

export const AlertModal = ({ isOpen, onClose, message }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setVisible(true), 10);
    } else {
      setVisible(false);
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={`${css.alertContent} ${visible ? css.show : ""}`}>
        <p className={css.alert_p}>{message}</p>
        <button className={css.closeBtn} onClick={onClose}>
          OK
        </button>
      </div>
    </Modal>
  );
};
