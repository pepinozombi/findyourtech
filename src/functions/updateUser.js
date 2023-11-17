import { app } from "../firebase/config";
import {
  getFirestore,
  collection,
  getDocs, 
  query, 
  where,
  updateDoc, // Agrega esta importación
} from "firebase/firestore";

const db = getFirestore(app);

const updateUser = async (uid, userProps) => {
  if (!uid) {
    return { status: 400, message: "Bad Request", data: "UID missing" };
  }

  // Consultar si el usuario ya existe en la colección UserProps
  const collectionRef = collection(db, "UserProps");
  const qUser = query(collectionRef, where("uid", "==", uid));

  try {
    const querySnapshot = await getDocs(qUser);

    if (!querySnapshot.empty) {
      // El usuario existe en la base de datos, actualiza el documento
      const userDoc = querySnapshot.docs[0]; // Supongo que solo hay un resultado
      await updateDoc(userDoc.ref, userProps); // userProps contiene los campos que deseas actualizar

      return { status: 200, message: "OK", data: "Actualizado exitosamente" };
    } else {
      return { status: 404, message: "Not Found", data: "No se encontró el usuario en la base de datos" };
    }
  } catch (error) {
    console.error('Error al verificar/actualizar el usuario:', error);
    return { status: 500, message: "Server Error", data: error };
  }
};

export default updateUser;
