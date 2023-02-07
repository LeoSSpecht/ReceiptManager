import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyDzNGebQ9KH4SOcS-XeD44qbpnZAIC4o6s",
    authDomain: "receiptmanager10.firebaseapp.com",
    projectId: "receiptmanager10",
    storageBucket: "receiptmanager10.appspot.com",
    messagingSenderId: "803781307265",
    appId: "1:803781307265:web:ae10a76d238ec048ced680",
    measurementId: "G-S4T2QX2G5E"
  };

const app = initializeApp(firebaseConfig);
export { app };