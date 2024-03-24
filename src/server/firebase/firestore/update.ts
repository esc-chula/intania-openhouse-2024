import { doc, getFirestore, setDoc } from "firebase/firestore";
import firebase_app from "../config";

const db = getFirestore(firebase_app);

export const updateDocument = async (
  collectionName: string,
  id: string,
  data: any,
) => {
  const name = `${process.env.NODE_ENV === "production" ? "prod" : "dev"}_${collectionName}`;

  const docRef = doc(db, name, id);

  try {
    const result = await setDoc(docRef, data, {
      merge: true,
    });
    return { result: result, error: null };
  } catch (error) {
    return { result: null, error: error };
  }
};
