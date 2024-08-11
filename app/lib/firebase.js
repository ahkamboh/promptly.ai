// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "promptly-4827b.firebaseapp.com",
  projectId: "promptly-4827b",
  storageBucket: "promptly-4827b.appspot.com",
  messagingSenderId: "421112414909",
  appId: "1:421112414909:web:d31979ba9114b8cbc16dd4",
  measurementId: "G-8EX3KRE7YM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
