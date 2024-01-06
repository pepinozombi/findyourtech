import { app } from "../firebase/config";
import {
  getFirestore,
  doc,
  getDoc,
} from "firebase/firestore";

const db = getFirestore(app);

const getListById = async (id) => {
  if (!id) {
    return { status: 400, message: "Bad Request", data: "ID is required" };
  }

  // Obtener la referencia directa al documento usando el ID
  const clipRef = doc(db, "UserList", id);

  try {
    const clipDoc = await getDoc(clipRef);

    if (clipDoc.exists()) {
      // El clip existe, devuelve los datos del documento
      return { status: 200, message: "OK", data: clipDoc.data() };
    } else {
      // No se encontró el clip en la base de datos
      return { status: 404, message: "Not Found", data: "No se encontró el clip en la base de datos" };
    }
  } catch (error) {
    console.error('Error al verificar el clip:', error);
    return { status: 500, message: "Server Error", data: error };
  }
};

export default getListById;
