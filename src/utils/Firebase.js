// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAI8FaAYgYOEfRNRP-TY8-HavgrUCx19gs",
  authDomain: "cinemate-db01c.firebaseapp.com",
  projectId: "cinemate-db01c",
  storageBucket: "cinemate-db01c.appspot.com",
  messagingSenderId: "244847652396",
  appId: "1:244847652396:web:c444e6a41d0d6ee39e6b89",
  measurementId: "G-55YKBWGKTQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();