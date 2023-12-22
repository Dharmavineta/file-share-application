// Import the functions you need from the SDKs you need
import { getAuth } from "@clerk/nextjs/server";
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDYTOub74YPWCOVpRNmf3vQ9LF3SjCYpF8",
  authDomain: "samudra-1556b.firebaseapp.com",
  projectId: "samudra-1556b",
  storageBucket: "samudra-1556b.appspot.com",
  messagingSenderId: "531209483388",
  appId: "1:531209483388:web:85aadcd851cb83ef9b85f9",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
