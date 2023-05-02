import { auth, db } from "./index";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

export const createUser = async ({
  fName,
  lName,
  email,
  password,
  address,
  phone,
  img,
}) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const userRef = doc(db, "users", userCredential.user.uid);
  await setDoc(userRef, {
    fName,
    lName,
    email,
    address,
    phone,
    img,
  });
};

export const loginUser = async (email, password) => {
  await signInWithEmailAndPassword(auth, email, password);
};

export const getUserDetail = async () => {
  const user = auth.currentUser;
  const userRef = doc(db, "users", user.uid);
  const response = await getDoc(userRef);
  return response.data();
};

export const signOutUser = async () => {
  await signOut(auth);
};
