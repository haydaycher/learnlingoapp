// Хук для глобального зберігання користувача
import { useEffect, useState } from "react";
import { monitorAuthState } from "../firebase/auth";

export const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = monitorAuthState(setUser);
    return () => unsubscribe();
  }, []);

  return user;
};
