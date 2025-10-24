import React from "react";
import { Modal } from "../Modal/Modal";
import css from "./AlertModal.module.css";

export const AlertModal = ({ isOpen, onClose, message }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={css.alertContent}>
        <p className={css.alert_p}>{message}</p>
        <button className={css.closeBtn} onClick={onClose}>
          OK
        </button>
      </div>
    </Modal>
  );
};
