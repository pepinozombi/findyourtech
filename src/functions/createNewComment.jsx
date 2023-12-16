import { app } from "../firebase/config";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

const db = getFirestore(app);

export default async function createNewComment(commentData) {
  const collectionRef = collection(db, "Comment");
  const docRef = doc(collectionRef, uuidv4());
  //console.log(commentData);
  await setDoc(docRef, { ...commentData, createdAt: serverTimestamp() });
}
