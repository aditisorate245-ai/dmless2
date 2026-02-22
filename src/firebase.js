import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBdyLYasV6-GzIFmIKtxZfXWJyVvwYUEYA",
  authDomain: "dmless-f7bd9.firebaseapp.com",
  projectId: "dmless-f7bd9",
  messagingSenderId: "954815085550",
  appId: "1:954815085550:web:f5041bdd01929c9fb12cff",
  databaseURL: "https://dmless-f7bd9-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);