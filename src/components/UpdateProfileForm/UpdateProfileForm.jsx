// src/components/UpdateProfileForm.jsx
import { useState } from "react";
import { updateProfile, updatePassword } from "firebase/auth";
import { useAuth } from "../AuthProvider/AuthProvider";
import css from "./UpdateProfileForm.module.css";

export const UpdateProfileForm = ({ onClose }) => {
  const { currentUser } = useAuth();
  const [name, setName] = useState(currentUser?.displayName || "");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      if (name && name !== currentUser.displayName) {
        await updateProfile(currentUser, { displayName: name });
      }
      if (newPassword) {
        await updatePassword(currentUser, newPassword);
      }
      setMessage("Profile updated successfully ✅");
      // після оновлення профілю можна закрити модалку:
      // onClose();
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div
      className={css.modalOverlay}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <form
        onSubmit={handleUpdate}
        className={css.formContainer}
        onClick={(e) => e.stopPropagation()} // щоб клік усередині форми не закривав модалку
      >
        <button type="button" className={css.closeBtn} onClick={onClose}>
          <img src="/x.svg" alt="close" />
        </button>

        <h2>Update Profile</h2>

        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="off"
          />
        </label>

        <label>
          New Password:
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            autoComplete="new-password"
          />
        </label>

        <button type="submit" className={css.submitBtn}>
          Save changes
        </button>

        {message && <p>{message}</p>}
      </form>
    </div>
  );
};
