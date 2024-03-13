import { doc, getFirestore, setDoc } from "firebase/firestore";
import firebase_app from "../config";

const db = getFirestore(firebase_app);

export const deleteDocument = async (colllection: string, id: string) => {
  const docRef = doc(db, colllection, id);

  try {
    await setDoc(docRef, {}, { merge: true });
    return { result: true, error: null };
  } catch (error) {
    return { result: false, error: error };
  }
};
