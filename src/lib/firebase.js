// src/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";

// ✅ Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyAiwM2iAeFMy-A1nO9Lm-zknlnTMCu2vSY",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "anfassc-official.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "anfassc-official",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "anfassc-official.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "342182712971",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:342182712971:web:293b1b2f3cb4b92e61a68e",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-ZLEJ352WN7",
};

// ✅ Ensure Firebase initializes only once
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// ✅ Initialize Auth (safe for SSR, since it doesn't require window)
export const auth = getAuth(app);

// ✅ Initialize Analytics only in the browser
export const analytics = typeof window !== "undefined"
  ? await isSupported().then((yes) => (yes ? getAnalytics(app) : null))
  : null;

export default app;
