import { app } from "../firebase/config";
import {
  getFirestore,
  collection,
  getDoc,
  doc,
} from "firebase/firestore";

const db = getFirestore(app);

const getClipsByIDs = async (clipIDs) => {
  if (!clipIDs || clipIDs.length === 0) {
    return { status: 404, message: "Not found", data: "No se proporcionaron IDs de clips" };
  }

  const clips = [];

  try {
    for (const clipID of clipIDs) {
      const clipDocRef = doc(db, "ClipItemCard", clipID);
      const clipDocSnap = await getDoc(clipDocRef);

      if (clipDocSnap.exists()) {
        clips.push({ id: clipDocSnap.id, ...clipDocSnap.data() });
      } else {
        console.log(`El clip con ID ${clipID} no fue encontrado.`);
      }
    }

    if (clips.length > 0) {
      return { status: 200, message: "OK", data: clips };
    } else {
      return { status: 404, message: "Not found", data: "No se encontraron clips" };
    }
  } catch (error) {
    console.log('Error al obtener clips por IDs:', error);
    return { status: 500, message: "Server error", data: error };
  }
};

export default getClipsByIDs;
