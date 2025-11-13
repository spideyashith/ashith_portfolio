import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCuSLDDhzscJ-UpTLGYKTK0QwqId6N5VcA",
  authDomain: "ashith-portfolio.firebaseapp.com",
  projectId: "ashith-portfolio",
  storageBucket: "ashith-portfolio.appspot.com", // <-- Note corrected domain: appspot.com
  messagingSenderId: "974837407532",
  appId: "1:974837407532:web:28b23097feb9a0f9a51689",
  measurementId: "G-Q9RJ9ZFVEJ"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
