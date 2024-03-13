import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import firebase_app from "../config";

const db = getFirestore(firebase_app);

export const getDoumentById = async (collection: string, id: string) => {
  const docRef = doc(db, collection, id);

  try {
    const result = await getDoc(docRef);
    return { result, error: null };
  } catch (error) {
    return { result: null, error: error };
  }
};

export const getAllDocuments = async (collectionName: string) => {
  const collectionRef = collection(db, collectionName);

  try {
    const result = await getDocs(collectionRef);
    return { result, error: null };
  } catch (error) {
    return { result: null, error: error };
  }
};
