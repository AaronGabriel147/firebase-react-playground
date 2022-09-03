import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC2JfcttgN204KqS1IqJ9JQxkAsNX2SeEQ",
    authDomain: "playground-a4b7b.firebaseapp.com",
    projectId: "playground-a4b7b",
    storageBucket: "playground-a4b7b.appspot.com",
    messagingSenderId: "742249297631",
    appId: "1:742249297631:web:d11796765a59adde7a5b6a"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };