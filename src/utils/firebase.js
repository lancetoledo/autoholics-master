// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Import the functions you need from the SDKs you need

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAAVe2y2nYIrIc_WDf6xCRPvFcOPnd-hZk",
    authDomain: "autoholics-97fd2.firebaseapp.com",
    projectId: "autoholics-97fd2",
    storageBucket: "autoholics-97fd2.appspot.com",
    messagingSenderId: "155511844567",
    appId: "1:155511844567:web:07b504b06781e9795f4a92",
    measurementId: "G-FY0XRDXEB0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore()

// const analytics = getAnalytics(app);
export const auth = getAuth(app)
export default db