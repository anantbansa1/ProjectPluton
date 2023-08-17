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
import { getStorage } from "firebase/storage";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD-LB397Ku-LbA4i1doAo9owgzL5omN9hQ",
  authDomain: "testing-29ea7.firebaseapp.com",
  projectId: "testing-29ea7",
  storageBucket: "testing-29ea7.appspot.com",
  messagingSenderId: "70196304447",
  appId: "1:70196304447:web:86755b8f9c02a24f98b68a",
  measurementId: "G-HWXCJQ8BH2",
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);
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

export async function upload(file, currentUser, setLoading) {
  const fileRef = ref(storage, currentUser.uid + ".png");

  setLoading(true);

  const snapshot = await uploadBytes(fileRef, file);
  const photoURL = await getDownloadURL(fileRef);

  // updateProfile(currentUser, {photoURL});

  setLoading(false);
  alert("Uploaded file!");
}
