import { app } from "../firebase/config";
import {
  getFirestore,
  collection,
  getDocs, 
  query, 
  where,
} from "firebase/firestore";

const db = getFirestore(app);

const getUserByUID = async (uid) => {
  
    if(!uid) {return;}
    // Consultar si el usuario ya existe en la colección userProps

    const collectionRef = collection(db, "UserProps");
    let qUser = query(collectionRef);
    qUser = query(qUser, where("uid", "==", uid));
    
    try {
      const querySnapshot = await getDocs(qUser);

      if (!querySnapshot.empty) {
        // El usuario ya existe, no necesitas hacer nada
        console.log('Usuario ya existe en userProps');
        return {status: 200, message: "OK", data: querySnapshot.docs[0].data()};
      } else {
        return {status: 404,  message: "Not found", data: "No se encontró el usuario en la base de datos"}
      }
    } catch (error) {
      console.log('Error al verificar/crear el usuario:', error);
      return {status: 500,  message: "Server error", data: error}
    }
  };

  export default getUserByUID;