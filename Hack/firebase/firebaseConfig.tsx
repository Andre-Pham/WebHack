// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'





// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC6UP7kVozERMKr-QBGEyWsmiP6actXJ9U",
  authDomain: "macathonwebhack.firebaseapp.com",
  projectId: "macathonwebhack",
  storageBucket: "macathonwebhack.appspot.com",
  messagingSenderId: "298535674889",
  appId: "1:298535674889:web:5b35ee090ae9a471ad44d8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export default app