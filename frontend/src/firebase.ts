// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Firebase config for your new project
const firebaseConfig = {
  apiKey: "AIzaSyDHqO1UqdRnFNXR5x8Iz79bMhLnTDMR9Wc",
  authDomain: "auth-28088.firebaseapp.com",
  projectId: "auth-28088",
  storageBucket: "auth-28088.appspot.com", // FIXED URL
  messagingSenderId: "367271405674",
  appId: "1:367271405674:web:b74c23bd37986c898d0213",
  measurementId: "G-47HWY65LE3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { app, auth, provider };
