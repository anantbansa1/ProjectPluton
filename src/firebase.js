import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAGNB7Q_ZQXC1OQxIwiG8o8CYh5UatsHkA",
  authDomain: "pluton-684e6.firebaseapp.com",
  projectId: "pluton-684e6",
  storageBucket: "pluton-684e6.appspot.com",
  messagingSenderId: "162229444799",
  appId: "1:162229444799:web:07e24c65acc101f75ba60a",
  measurementId: "G-B9FQKHTNDZ",
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
  const fileRef = ref(storage, currentUser.uid + '.png');

  setLoading(true);
  
  const snapshot = await uploadBytes(fileRef, file);
  const photoURL = await getDownloadURL(fileRef);

  // updateProfile(currentUser, {photoURL});
  
  setLoading(false);
  alert("Uploaded file!");
}
