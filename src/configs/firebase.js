// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpz11MySsThbrbQlkEm1J0i3d0Fjx0V-Y",
  authDomain: "peektionary-a23d7.firebaseapp.com",
  projectId: "peektionary-a23d7",
  storageBucket: "peektionary-a23d7.appspot.com",
  messagingSenderId: "70401126302",
  appId: "1:70401126302:web:51d2c3da842dcbe10db08f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
