import { getApps, initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

export const getAllDocuments = async (collectionName: string) => {
  if (!getApps().length) {
    initializeApp(firebaseConfig);
  }

  const db = getFirestore();

  const collectionRef = collection(db, collectionName);

  try {
    const result = await getDocs(collectionRef);
    return { result, error: null };
  } catch (error) {
    return { result: null, error: error };
  }
};
