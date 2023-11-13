// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDMBcyxYhFDExA7oD0t2-CHlnWYXfj2GXU",
    authDomain: "mental-health-afe0e.firebaseapp.com",
    projectId: "mental-health-afe0e",
    storageBucket: "mental-health-afe0e.appspot.com",
    messagingSenderId: "1014912972960",
    appId: "1:1014912972960:web:78bb384ec60250b40ff1c5",
    measurementId: "G-MYVVGW57LL"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
