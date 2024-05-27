import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage'; 

const firebaseConfig = {
  apiKey: "AIzaSyAjck90aFqY1Ec3lEWUrbIE69WUqFDsYM4",
  authDomain: "social-media-app-a8326.firebaseapp.com",
  projectId: "social-media-app-a8326",
  storageBucket: "social-media-app-a8326.appspot.com",
  messagingSenderId: "409879471865",
  appId: "1:409879471865:web:02a726cc03b44cd43ea428"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);