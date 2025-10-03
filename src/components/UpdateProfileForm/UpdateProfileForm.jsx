// src/components/UpdateProfileForm.jsx
import { useState } from "react";
import { updateProfile, updatePassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import { useAuth } from "../AuthProvider/AuthProvider";

export const UpdateProfileForm = () => {
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

      setMessage("Profile updated successfully");
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <form
      onSubmit={handleUpdate}
      style={{ padding: "20px", background: "#fff", borderRadius: "8px" }}
    >
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

      <button type="submit">Save changes</button>

      {message && <p>{message}</p>}
    </form>
  );
};
