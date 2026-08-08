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

let app: any;
let auth: any;
let db: any;
let analytics: any = null;
let googleProvider: any;
let isMock = false;

try {
  if (getApps().length > 0) {
    app = getApp();
    auth = getAuth(app);
    try {
      db = getFirestore(app);
    } catch (e) {
      console.warn("Firestore access notice:", e);
      db = null;
    }
  } else {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    try {
      db = getFirestore(app);
    } catch (e) {
      console.warn("Firestore fallback initialization notice:", e);
      db = null;
    }
  }

  googleProvider = new GoogleAuthProvider();
  isMock = false;

  if (typeof window !== 'undefined') {
    isSupported().then((supported) => {
      if (supported) {
        analytics = getAnalytics(app);
      }
    }).catch(() => {});
  }

  console.log("⚡ Real Firebase initialized successfully for project:", firebaseConfig.projectId);
} catch (error) {
  console.error("Firebase failed to initialize:", error);
  isMock = true;
}

export { app, auth, db, analytics, googleProvider, isMock, RecaptchaVerifier, signInWithPhoneNumber };
