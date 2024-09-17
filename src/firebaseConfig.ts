// Import the functions you need from the SDKs you need
import { FirebaseApp, FirebaseOptions, initializeApp } from "firebase/app";
import { Auth, getReactNativePersistence, getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
import { Database, getDatabase } from "firebase/database";
import AsyncStorage from "@react-native-async-storage/async-storage";
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBeWvAXM8fE6nY5qdfqK4x8fQ9tGanNGBE",
  authDomain: "cookingapp-e9b0d.firebaseapp.com",
  databaseURL: "https://cookingapp-e9b0d-default-rtdb.firebaseio.com",
  projectId: "cookingapp-e9b0d",
  storageBucket: "cookingapp-e9b0d.appspot.com",
  messagingSenderId: "934633635982",
  appId: "1:934633635982:web:870f40b5da0be63bb089df",
  measurementId: "G-T9NLZB15SS"
};

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db: Database = getDatabase(app);
//export const auth: Auth = getAuth(app);
export const auth: Auth = getAuth(app);

