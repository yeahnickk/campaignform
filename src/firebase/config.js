import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCYAAU4XQyA7tFBaK8CzLxWOWbzzJpJr5w",
    authDomain: "campaignformtest.firebaseapp.com",
    projectId: "campaignformtest",
    storageBucket: "campaignformtest.appspot.com",
    messagingSenderId: "511880344410",
    appId: "1:511880344410:web:e646aa6a74d524f1867963"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); 