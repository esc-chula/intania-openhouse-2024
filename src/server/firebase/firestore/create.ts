import { doc, getFirestore, setDoc } from "firebase/firestore";
import firebase_app from "../config";

const db = getFirestore(firebase_app);

export const createDocument = async (
  collectionName: string,
  id: string,
  data: any,
) => {
  const name = `${process.env.NODE_ENV === "production" ? "prod" : "dev"}_${collectionName}`;
  const docRef = doc(db, name, id);

  try {
    await setDoc(docRef, data);
    return { result: data, error: null };
  } catch (error) {
    return { result: null, error: error };
  }
};
