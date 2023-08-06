// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAGNB7Q_ZQXC1OQxIwiG8o8CYh5UatsHkA",
  authDomain: "pluton-684e6.firebaseapp.com",
  projectId: "pluton-684e6",
  storageBucket: "pluton-684e6.appspot.com",
  messagingSenderId: "162229444799",
  appId: "1:162229444799:web:07e24c65acc101f75ba60a",
  measurementId: "G-B9FQKHTNDZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth();

export function useAuth() {
  const [user, setUser] = useState();
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => setUser(user));
    return unsub;
  }, []);

  return user;
}

export function signIn(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}
export function signUp(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function logOut() {
  return signOut(auth);
}

// export function adduser(){

// }
