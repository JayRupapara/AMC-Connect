// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAcHEpY41TuwCzWYnnb9rnVUEjVP3NOTrs",
  authDomain: "ahmedabad-citizen-support.firebaseapp.com",
  projectId: "ahmedabad-citizen-support",
  storageBucket: "ahmedabad-citizen-support.firebasestorage.app",
  messagingSenderId: "1025536568315",
  appId: "1:1025536568315:web:d572c0b85eabe62116b95e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const realtimeDb = getDatabase(app);
export {    auth, db, realtimeDb };