// src/firebase/config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCx11MqDdLCZgf1SO6bY-Co8fYJYqUlh7s",
  authDomain: "learnlingoapp-golearn.firebaseapp.com",
  projectId: "learnlingoapp-golearn",
  storageBucket: "learnlingoapp-golearn.appspot.com",
  messagingSenderId: "1000447624820",
  appId: "1:1000447624820:web:4a0aa2d6333be0f4117321",
  measurementId: "G-E8NCEBH53F",
};

// Ініціалізація Firebase
const app = initializeApp(firebaseConfig);

// Auth
export const auth = getAuth(app);

// Database (з правильним URL)
export const db = getDatabase(
  app,
  "https://learnlingoapp-golearn-default-rtdb.europe-west1.firebasedatabase.app"
);

export default app;
