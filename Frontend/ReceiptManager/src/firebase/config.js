import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDzNGebQ9KH4SOcS-XeD44qbpnZAIC4o6s",
  authDomain: "receiptmanager10.firebaseapp.com",
  projectId: "receiptmanager10",
  storageBucket: "receiptmanager10.appspot.com",
  messagingSenderId: "803781307265",
  appId: "1:803781307265:web:3dd7f7efb763ff60ced680",
  measurementId: "G-Q1JF3LYTN8"
};

const app = initializeApp(firebaseConfig);
export { app };