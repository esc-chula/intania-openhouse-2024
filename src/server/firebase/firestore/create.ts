import { doc, getFirestore, setDoc } from "firebase/firestore";
import firebase_app from "../config";

const db = getFirestore(firebase_app);

export const createDocument = async (
  colllection: string,
  id: string,
  data: any,
) => {
  const docRef = doc(db, colllection, id);

  try {
    await setDoc(docRef, data);
    return { result: data, error: null };
  } catch (error) {
    return { result: null, error: error };
  }
};
