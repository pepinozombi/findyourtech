import { initializeApp } from 'firebase/app';
import { getAuth }  from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAGwDrFi7hY_zEX4NKmIMvOTaVEvjAd8_Q",
  authDomain: "pepinozombi-2022.firebaseapp.com",
  projectId: "pepinozombi-2022",
  storageBucket: "pepinozombi-2022.appspot.com",
  messagingSenderId: "195599064999",
  appId: "1:195599064999:web:5edff1b936759b8798e082",
  measurementId: "G-JTY9633BLW"
};

export const app = initializeApp(firebaseConfig);

export const authentication = getAuth(app);