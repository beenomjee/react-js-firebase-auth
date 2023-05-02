import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCoFmEPDOVMsljyOipzPlVZeR4ckqzf0Oo",
  authDomain: "react-js-firebase-auth-5a2f9.firebaseapp.com",
  projectId: "react-js-firebase-auth-5a2f9",
  storageBucket: "react-js-firebase-auth-5a2f9.appspot.com",
  messagingSenderId: "629835645272",
  appId: "1:629835645272:web:182eccdb7716d2bb65a52d",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { app, auth, db };
