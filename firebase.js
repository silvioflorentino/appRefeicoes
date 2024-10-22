import {initializeApp} from "firebase/app";
import{getFirestore}from "firebase/firestore";
import {getAuth} from "firebase/auth";
import { initializeAuth, getReactNativePersistence,getAuth } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig ={
    apiKey: "AIzaSyCMwRl7PnYyD2sQlXdAmoa833hczAB5Jic",
    authDomain: "apprefeicaosilvio.firebaseapp.com",
    projectId: "apprefeicaosilvio",
    storageBucket: "apprefeicaosilvio.appspot.com",
    messagingSenderId: "986619976539",
    appId: "1:986619976539:web:9b3d5ff9a8319ac1c8987e"
}

const app = initializeApp(firebaseConfig);
const aut = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });
export const firestore = getFirestore(app);
export const auth = getAuth(app);



