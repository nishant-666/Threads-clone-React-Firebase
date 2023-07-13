// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBss01olmS_Ghxrr7SHggNn6MaQkvK0GXk",
  authDomain: "threads-clone-b63d6.firebaseapp.com",
  projectId: "threads-clone-b63d6",
  storageBucket: "threads-clone-b63d6.appspot.com",
  messagingSenderId: "293085224670",
  appId: "1:293085224670:web:a0f234502b29e1718dec4f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getFirestore(app);
const storage = getStorage(app);

export { auth, app, database, storage };
