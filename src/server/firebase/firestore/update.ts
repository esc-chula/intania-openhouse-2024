import { doc, getFirestore, setDoc } from "firebase/firestore";
import firebase_app from "../config";

const db = getFirestore(firebase_app);

export const updateDocument = async (
  colllection: string,
  id: string,
  data: any,
) => {
  const docRef = doc(db, colllection, id);

  try {
    const result = await setDoc(docRef, data, {
      merge: true,
    });
    return { result: result, error: null };
  } catch (error) {
    return { result: null, error: error };
  }
};
