import { app } from "../firebase/config";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where
} from "firebase/firestore";

const db = getFirestore(app);

const getClipLikeByUserClip = async (user, clipId) => {

  // Consultar si el usuario ya existe en la colección userProps

  const collectionRef = collection(db, "UserList");
  let qUser = query(collectionRef);
  qUser = query(qUser, where("user", "==", user), where("likeList", "==", true));

  try {
    const querySnapshot = await getDocs(qUser);

    if (querySnapshot.empty) {
      // La lista no existe, así que no hay like
      console.log('likes vacios');
      return { status: 200, message: "OK", data: false };
    } else {
      //la lista existe, obtenerla
      let listId = querySnapshot.docs[0].id;
      const collectionRef1 = collection(db, "ListClip");
      let q = query(collectionRef1);
      q = query(q, where("user", "==", user), where("listId", "==", listId), where("clipId", "==", clipId.clipId));

      const querySnapshot1 = await getDocs(q);

      if (querySnapshot1.empty) {
        return {status: 200, message: "OK", data: false};
      } else {
        return {status: 200, message: "OK", data: true};
      }
      
    }
  } catch (error) {
    console.log('Error al verificar/crear la lista de me gustas:', error);
    return {status: 500, message: "ERROR", data: false};
  }
};

export default getClipLikeByUserClip;