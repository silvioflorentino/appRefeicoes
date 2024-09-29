import {initializeApp} from "firebase/app";
import{getFirestore}from "firebase/firestore";

const firebaseConfig ={
    apiKey: "AIzaSyBOVXJiqWoFfS2wCMGPzQrMHkSFkqO09kg",
    authDomain: "apprefeicoesbd.firebaseapp.com",
    projectId: "apprefeicoesbd",
    storageBucket: "apprefeicoesbd.appspot.com",
    messagingSenderId: "772708457164",
    appId: "1:772708457164:web:4809752cdef91e53890069"
}

const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);