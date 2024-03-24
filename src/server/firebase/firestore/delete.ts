import { doc, getFirestore, setDoc } from "firebase/firestore";
import firebase_app from "../config";

const db = getFirestore(firebase_app);

export const deleteDocument = async (collectionName: string, id: string) => {
  const name = `${process.env.NODE_ENV === "production" ? "prod" : "dev"}_${collectionName}`;
  const docRef = doc(db, name, id);

  try {
    await setDoc(docRef, {}, { merge: true });
    return { result: true, error: null };
  } catch (error) {
    return { result: false, error: error };
  }
};
