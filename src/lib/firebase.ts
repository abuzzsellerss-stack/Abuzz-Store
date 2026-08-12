import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { initializeFirestore, getFirestore, persistentLocalCache, persistentMultipleTabManager } from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyAzsL3QdOYSuLnXSE0H9QVsc3bi8goBghg",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "abuzz-store.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "abuzz-store",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "abuzz-store.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "962126268502",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:962126268502:web:9f068620c5321e837b93f7",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-GMDG143FY6"
};

let app: any = null;
let auth: any = null;
let db: any = null;
let analytics: any = null;
let googleProvider: any = null;
let isMock = true;

if (typeof window !== 'undefined') {
  try {
    app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    auth = getAuth(app);
    try {
      db = getFirestore(app);
    } catch (e) {
      console.warn("Firestore access notice:", e);
    }
    googleProvider = new GoogleAuthProvider();
    isMock = false;

    isSupported().then((supported) => {
      if (supported) {
        analytics = getAnalytics(app);
      }
    }).catch(() => {});
  } catch (error) {
    console.error("Firebase browser initialization error:", error);
    isMock = true;
  }
}

export { app, auth, db, analytics, googleProvider, isMock, RecaptchaVerifier, signInWithPhoneNumber };
