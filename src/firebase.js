import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCrwRMAXKgNGiv4xqDVin2NNJHrBdQHuzY",
  authDomain: "kiosko-digital-68926.firebaseapp.com",
  projectId: "kiosko-digital-68926",
  storageBucket: "kiosko-digital-68926.appspot.com",
  messagingSenderId: "13770812164",
  appId: "1:13770812164:web:89ea65b19c3f70229abe51",
  measurementId: "G-N7TKZ6B0T4"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    console.log(user);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const githubProvider = new GithubAuthProvider();
const signInWithGithub = async () => {
  try {
    const res = await signInWithPopup(auth, githubProvider);
    const user = res.user;
    console.log(user);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
};

export { app, auth, db, signInWithGoogle, signInWithGithub, logout };
