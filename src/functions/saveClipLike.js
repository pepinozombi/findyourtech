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

const saveClipLike = async (user, list, clipId, isLike) => {
  const collectionRef = collection(db, "ListClip");
  let qUser = query(collectionRef);
  qUser = query(qUser, where("user", "==", user), where("listId", "==", list), where("clipId", "==", clipId.clipId));

  try {
    const querySnapshot = await getDocs(qUser);

    if (!querySnapshot.empty) {
      // El usuario ya existe, borrar el documento
      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
        console.log('Documento eliminado');
      });

      return { status: 200, message: "OK", data: true };
    } else {
      // El usuario no existe, crea un nuevo documento con valores por defecto
      let id = uuidv4();
      const userRef = doc(collectionRef, id); // Genera un nuevo documento con id uuidv4
      
      await setDoc(userRef, {
        user: user,
        clipId: clipId.clipId,
        listId: list
        // Otras propiedades por defecto aquí
      });

      return { status: 200, message: "OK", data: true };
    }
  } catch (error) {
    console.log('Error al verificar/crear el usuario:', error);
    return false;
  }
};

export default saveClipLike;
