import { app } from "../firebase/config";
import {
  getFirestore,
  collection,
  getDocs, 
  query, 
  where,
} from "firebase/firestore";

const db = getFirestore(app);

const checkUserNameAvailability = async (twitterAuthUser, name) => {
    const uid = twitterAuthUser.user.uid;
  
    // Consultar si el usuario ya existe en la colección userProps

    const collectionRef = collection(db, "UserProps");
    let qUser = query(collectionRef);
    qUser = query(qUser, where("uid", "!=", uid));
    qUser = query(qUser, where("name", "==", name));
    
    try {
      const querySnapshot = await getDocs(qUser);

      if (!querySnapshot.empty) {
        // El usuario ya existe, no necesitas hacer nada
        return {status: 500,  message: "Server error", data: "Nombre de usuario no disponible"}
      } else {
        
        return {status: 200, message: "OK", data: "Nombre de usuario disponible"};
      }
    } catch (error) {
      console.log('Error al verificar/crear el usuario:', error);
      return {status: 500,  message: "Server error", data: error}
    }
  };

  export default checkUserNameAvailability;