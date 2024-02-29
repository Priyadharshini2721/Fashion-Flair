// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDHFflEBKAXbLn6MhuPog_aOvehUyd5HBU",
  authDomain: "fashion-flair-48363.firebaseapp.com",
  projectId: "fashion-flair-48363",
  storageBucket: "fashion-flair-48363.appspot.com",
  messagingSenderId: "242117410658",
  appId: "1:242117410658:web:87b446ddf6d8d8e8a7b63b",
  measurementId: "G-3P1NQYTN8J"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);