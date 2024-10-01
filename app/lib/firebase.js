// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "artisanal-3a657.firebaseapp.com",
  databaseURL: "https://artisanal-3a657-default-rtdb.firebaseio.com",
  projectId: "artisanal-3a657",
  storageBucket: "artisanal-3a657.appspot.com",
  messagingSenderId: "828954438665",
  appId: "1:828954438665:web:daf30641fcce8721ca1cd8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
