import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAvzMuVRoJTly0w05BUZ6c_lKIrWbcjgGg",
  authDomain: "e-learning-portal-notes-web.firebaseapp.com",
  projectId: "e-learning-portal-notes-web",
  storageBucket: "e-learning-portal-notes-web.appspot.com",
  messagingSenderId: "626964993902",
  appId: "1:626964993902:web:6a7a9600ed8a2f62a6137f",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const db = getFirestore(app);

export { db };
