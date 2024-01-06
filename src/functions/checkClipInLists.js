import { app } from "../firebase/config";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

const db = getFirestore(app);

const checkClipInLists = async (lists, user, clipId) => {
  if (!clipId || !lists) {
    return;
  }

  let completeLists = [];

  try {
    const queries = [];
    
    for (const list of lists) {
      let collectionRef = collection(db, "ListClip");
      let qUser = query(collectionRef);

      qUser = query(qUser, where("user", "==", user));
      qUser = query(qUser, where("listId", "==", list.id));
      qUser = query(qUser, where("clipId", "==", clipId.clipId));

      queries.push(getDocs(qUser));
    }

    const querySnapshots = await Promise.all(queries);

    querySnapshots.forEach((querySnapshot, index) => {
      const list = lists[index];
      if (!querySnapshot.empty) {
        completeLists.push({ id: list.id, name: list.name, clipInList: true });
      } else {
        completeLists.push({ id: list.id, name: list.name, clipInList: false });
      }
    });

    return { status: 200, message: "OK", data: completeLists };
  } catch (error) {
    console.log('Error al verificar el clip en la lista:', error);
    return { status: 500, message: "Error interno del servidor" };
  }
};

export default checkClipInLists;
