// Import the functions you need from the SDKs you need
import { FirebaseApp, FirebaseOptions, initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
import { Database, getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyB5ysY51scMo74_CjSdKwTWqlIB85WVkEw",
  authDomain: "lemmecook-91255.firebaseapp.com",
  databaseURL: "https://lemmecook-91255-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "lemmecook-91255",
  storageBucket: "lemmecook-91255.appspot.com",
  messagingSenderId: "176721447738",
  appId: "1:176721447738:web:8ac108421a92d28bdf1e03",
  measurementId: "G-C6LBVHNM1T"
};

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db: Database = getDatabase(app);
export const auth: Auth = getAuth(app);