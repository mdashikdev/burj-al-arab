import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA5bC8rXOZ799abvr2SyytFfhHM1fr_Cfs",
    authDomain: "burj-al-arab-626ef.firebaseapp.com",
    projectId: "burj-al-arab-626ef",
    storageBucket: "burj-al-arab-626ef.appspot.com",
    messagingSenderId: "54471994103",
    appId: "1:54471994103:web:c1f5852b710be7dd9881f2"
  };

const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);