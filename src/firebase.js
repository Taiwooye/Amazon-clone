import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBUiboINAR923QNZIZkQTz2UpsnXTdyW_Q",
  authDomain: "clone-d0350.firebaseapp.com",
  projectId: "clone-d0350",
  storageBucket: "clone-d0350.appspot.com",
  messagingSenderId: "956511189072",
  appId: "1:956511189072:web:280cf03e8aa44e60223955",
  measurementId: "G-57R0MPJ2LV",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
