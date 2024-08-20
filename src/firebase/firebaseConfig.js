
import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
import { getFirestore} from "firebase/firestore";
import { getStorage } from "firebase/storage";



const firebaseConfig = {
    apiKey: "AIzaSyDtglHZfgsaClEmQF6bnYqvKuDuL3XKWtw",
    authDomain: "james-store-5d0c7.firebaseapp.com",
    projectId: "james-store-5d0c7",
    storageBucket: "james-store-5d0c7.appspot.com",
    messagingSenderId: "80465013202",
    appId: "1:80465013202:web:6e27d904178e63e447400b"
  };

//   initialize Firebase
const app = initializeApp(firebaseConfig);

// initialize database
const db = getFirestore();

// initialize storage
const storage = getStorage(app);

export { storage, db };