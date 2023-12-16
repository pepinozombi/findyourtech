import { app } from "../firebase/config";
import {
  getFirestore,
  collection,
  getDocs, 
  query, 
  where,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

const db = getFirestore(app);

const getUserByName = async (name) => {
  
    if(!name) {return;}
    // Consultar si el usuario ya existe en la colección userProps

    const collectionRef = collection(db, "UserProps");
    let qUser = query(collectionRef);
    qUser = query(qUser, where("uniqueName", "==", name));
    
    try {
      const querySnapshot = await getDocs(qUser);

      if (!querySnapshot.empty) {
        // El usuario ya existe, no necesitas hacer nada
        console.log(querySnapshot.docs[0].data());
        return {status: 200, message: "OK", data: querySnapshot.docs[0].data()};
      } else {
        return {status: 404,  message: "Not found", data: "No se encontró el usuario en la base de datos"}
      }
    } catch (error) {
      console.log('Error al verificar/crear el usuario:', error);
      return {status: 500,  message: "Server error", data: error}
    }
  };

  export default getUserByName;