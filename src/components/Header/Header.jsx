// src/components/Header.jsx
import { signOut } from "firebase/auth";

import { auth } from "../../firebase/config";
import { useAuth } from "../AuthProvider/AuthProvider";

export const Header = () => {
  const { currentUser } = useAuth();

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <header>
      {currentUser ? (
        <>
          <span>Welcome, {currentUser.email}</span>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <span>Please sign in</span>
      )}
    </header>
  );
};
