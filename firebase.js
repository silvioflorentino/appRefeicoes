import {initializeApp} from "firebase/app";
import{getFirestore}from "firebase/firestore";

const firebaseConfig ={
    apiKey: "AIzaSyCMwRl7PnYyD2sQlXdAmoa833hczAB5Jic",
    authDomain: "apprefeicaosilvio.firebaseapp.com",
    projectId: "apprefeicaosilvio",
    storageBucket: "apprefeicaosilvio.appspot.com",
    messagingSenderId: "986619976539",
    appId: "1:986619976539:web:9b3d5ff9a8319ac1c8987e"
}

const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);