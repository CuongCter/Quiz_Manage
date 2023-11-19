// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDeVaWBrmFPenha4TwUIkGgX39yw-gUepY",
    authDomain: "thitracnghiem-35773.firebaseapp.com",
    projectId: "thitracnghiem-35773",
    storageBucket: "thitracnghiem-35773.appspot.com",
    messagingSenderId: "11569880962",
    appId: "1:11569880962:web:4b1f1acc260451f0dd399b",
    measurementId: "G-N1HWHM4GD2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);