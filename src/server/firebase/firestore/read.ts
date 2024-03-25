import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import firebase_app from "../config";

const db = getFirestore(firebase_app);

export const getDocumentById = async (collectionName: string, id: string) => {
  const name = `${process.env.NODE_ENV === "production" ? "prod" : "dev"}_${collectionName}`;

  const docRef = doc(db, name, id);

  try {
    const result = await getDoc(docRef);
    return { result, error: null };
  } catch (error) {
    return { result: null, error: error };
  }
};

export const getAllDocuments = async (collectionName: string) => {
  const name = `${process.env.NODE_ENV === "production" ? "prod" : "dev"}_${collectionName}`;

  const collectionRef = collection(db, name);

  try {
    const result = await getDocs(collectionRef);
    return { result, error: null };
  } catch (error) {
    return { result: null, error: error };
  }
};
