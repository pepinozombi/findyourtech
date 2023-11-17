import { app } from "../firebase/config";
import {
  getFirestore,
  collection,
  getDocs, 
  query, 
  where,
  doc,
  setDoc
} from "firebase/firestore";
import generateRandomUsername from "./generateRandomUsername";
import generateUserProfilePic from "./generateUserProfilePic";

const db = getFirestore(app);

const checkAndCreateUser = async (twitterAuthUser) => {
    const uid = twitterAuthUser.user.uid;
  
    // Consultar si el usuario ya existe en la colección userProps

    const collectionRef = collection(db, "UserProps");
    let qUser = query(collectionRef);
    qUser = query(qUser, where("uid", "==", uid));
    
    try {
      const querySnapshot = await getDocs(qUser);

      if (!querySnapshot.empty) {
        // El usuario ya existe, no necesitas hacer nada
        console.log('Usuario ya existe en userProps');
        return false;
      } else {
        // El usuario no existe, crea un nuevo documento con valores por defecto
        //generamos cosas antes
        let defaultUserName = await generateRandomUsername();
        let defaultUserProfilePic = await generateUserProfilePic(defaultUserName);
        const userRef = doc(collectionRef); // Genera un nuevo documento sin ID específica

        await setDoc(userRef, {
          name: defaultUserName,
          uniqueName: defaultUserName,
          email: twitterAuthUser.email || '',
          hasEditedName: false,
          profilePic: defaultUserProfilePic,
          uid: uid,
          discord: "",
          twitter: "",
          twitch: "",
          youtube: "",
          vip: false
          // Otras propiedades por defecto aquí
        });
        console.log('Nuevo usuario creado en userProps');
        return true;
      }
    } catch (error) {
      console.log('Error al verificar/crear el usuario:', error);
      return false;
    }
  };

  export default checkAndCreateUser;