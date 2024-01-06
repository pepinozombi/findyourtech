import { app } from "../firebase/config";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  doc,
  setDoc,
  serverTimestamp
} from "firebase/firestore";

import { v4 as uuidv4 } from "uuid";

const db = getFirestore(app);

const getCreateLikeListByUser = async (user) => {

  // Consultar si el usuario ya existe en la colección userProps

  const collectionRef = collection(db, "UserList");
  let qUser = query(collectionRef);
  qUser = query(qUser, where("user", "==", user), where("likeList", "==", true));

  try {
    const querySnapshot = await getDocs(qUser);

    if (querySnapshot.empty) {
      // La lista no existe, crearla y obtener el id
      let id = uuidv4();
      const userRef = doc(collectionRef, id); // Genera un nuevo documento con id uuidv4

      await setDoc(userRef, {
        name: "Liked clips",
        likeList: true,
        description: "",
        user: user,
        createdAt: serverTimestamp()
        // Otras propiedades por defecto aquí
      });

      return { status: 200, message: "OK", data: id };
    } else {
      //la lista existe, obtenerla
      return {status: 200, message: "OK", data: querySnapshot.docs[0].id};
    }
  } catch (error) {
    console.log('Error al verificar/crear la lista de me gustas:', error);
    return false;
  }
};

export default getCreateLikeListByUser;