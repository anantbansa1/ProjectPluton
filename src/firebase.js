 // Import the functions you need from the SDKs you need
 import { initializeApp } from "firebase/app";
 import { getFirestore } from "firebase/firestore";
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries
 // Your web app's Firebase configuration
 const firebaseConfig = {
    apiKey: "AIzaSyAGNB7Q_ZQXC1OQxIwiG8o8CYh5UatsHkA",
    authDomain: "pluton-684e6.firebaseapp.com",
    projectId: "pluton-684e6",
    storageBucket: "pluton-684e6.appspot.com",
    messagingSenderId: "162229444799",
    appId: "1:162229444799:web:07e24c65acc101f75ba60a",
    measurementId: "G-B9FQKHTNDZ"
 };
 // Initialize Firebase
 
 const app = initializeApp(firebaseConfig);
 // Export firestore database
 // It will be imported into your react app whenever it is needed
 export const db = getFirestore(app);