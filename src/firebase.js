import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDDBHldX9A4I_74tatgnQC8WSh-MHfHuEQ",
  authDomain: "disney-clone-c243b.firebaseapp.com",
  projectId: "disney-clone-c243b",
  storageBucket: "disney-clone-c243b.firebasestorage.app",
  messagingSenderId: "616128155489",
  appId: "1:616128155489:web:c7dc2f3d8472eb2cb9bf20",
  measurementId: "G-03SPBVHCWF",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;