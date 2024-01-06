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

export default async function createNewList(listData, clipId, userId) {
  const collectionRef = collection(db, "UserList");
  const newId = uuidv4();
  const docRef = doc(collectionRef, newId);
  //console.log(commentData);
  await setDoc(docRef, { ...listData, createdAt: serverTimestamp() }).then(async () =>{
    //crear listClip
    const collectionListClipRef = collection(db, "ListClip");
    const newListClipId = uuidv4();
    const docListClipRef = doc(collectionListClipRef, newListClipId);
    console.log('metiendo nuevo video en lista');
    console.log({ clipId, listId: newListClipId, user: userId, createdAt: serverTimestamp() });
    await setDoc(docListClipRef, { clipId, listId: newId, user: userId}).then(() =>{
      return {status: 200, message: "OK", data: true}
    }).catch((error) => {
      console.log("ERROR: ", error);
      return {status: 500, message: "ERROR", data: false}
    });
  }).catch((error) => {
    console.log("ERROR: ", error);
    return {status: 500, message: "ERROR", data: false}
  });
}
