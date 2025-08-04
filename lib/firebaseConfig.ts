import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getStorage } from 'firebase/storage';  // Import Firebase Storage

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'placeholder-api-key',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'placeholder.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'placeholder-project',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'placeholder-project.appspot.com',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '123456789',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:123456789:web:placeholder',
};

// Only initialize Firebase if we have a valid API key
let app, db, auth, provider, storage;

try {
  if (firebaseConfig.apiKey !== 'placeholder-api-key') {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    auth = getAuth(app);
    provider = new GoogleAuthProvider();
    storage = getStorage(app);
  } else {
    // Mock objects for development/build
    console.warn('Firebase not initialized - using placeholder configuration');
    db = null;
    auth = null;
    provider = null;
    storage = null;
  }
} catch (error) {
  console.error('Firebase initialization error:', error);
  db = null;
  auth = null;
  provider = null;
  storage = null;
}

export { db, auth, provider, storage };
