import { app } from "../firebase/config";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  doc,
  setDoc,
  deleteDoc // Importa deleteDoc desde firebase/firestore
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

const db = getFirestore(app);

const saveClipDeprecated = async (user, clipId) => {
  const collectionRef = collection(db, "DeprecatedClip");
  let qUser = query(collectionRef);
  qUser = query(qUser, where("user", "==", user), where("clipId", "==", clipId.clipId));

  try {
    const querySnapshot = await getDocs(qUser);

    if (!querySnapshot.empty) {
      // El deprecated ya existe, borrar el documento
      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
        console.log('Deprecated eliminado');
      });

      return { status: 200, message: "OK", data: true };
    } else {
      // El deprecated no existe, crea un nuevo documento
      let id = uuidv4();
      const userRef = doc(collectionRef, id); // Genera un nuevo documento con id uuidv4
      
      await setDoc(userRef, {
        user: user,
        clipId: clipId.clipId
        // Otras propiedades por defecto aquí
      });

      return { status: 200, message: "OK", data: true };
    }
  } catch (error) {
    console.log('Error al verificar el deprecated:', error);
    return false;
  }
};

export default saveClipDeprecated;
