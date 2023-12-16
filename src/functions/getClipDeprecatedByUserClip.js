import { app } from "../firebase/config";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where
} from "firebase/firestore";

const db = getFirestore(app);

const getClipDeprecatedByUserClip = async (user, clipId) => {
  const collectionRef = collection(db, "DeprecatedClip");
  let qUser = query(collectionRef);
  qUser = query(qUser, where("user", "==", user), where("clipId", "==", clipId.clipId));

  try {
    const querySnapshot = await getDocs(qUser);

    if (!querySnapshot.empty) {
      // El deprecated existe
      return { status: 200, message: "OK", data: true };
    } else {
      // El deprecated no existe
      return { status: 200, message: "OK", data: false };
    }
  } catch (error) {
    console.log('Error al verificar el deprecated:', error);
    return false;
  }
};

export default getClipDeprecatedByUserClip;
