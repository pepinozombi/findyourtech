import { app } from "../firebase/config";
import {
  getFirestore,
  collection,
  getDocs, 
  query, 
  where,
} from "firebase/firestore";

const db = getFirestore(app);

const getCommentsFromClip = async (id) => {
  
    if(!id) {return;}

    let comments = []; 

    const collectionRef = collection(db, "Comment");
    let qUser = query(collectionRef);
    qUser = query(qUser, where("clipId", "==", id));
    
    try {
      const querySnapshot = await getDocs(qUser);

      if (!querySnapshot.empty) {

        querySnapshot.forEach((doc) => {
            comments.push({ id: doc.id, ...doc.data() });
        });

        return {status: 200, message: "OK", data: comments};
      } else {
        return {status: 404,  message: "Not found", data: "No se encontraron comentarios de este clip en la base de datos"}
      }
    } catch (error) {
      console.log('Error al buscar comentarios:', error);
      return {status: 500,  message: "Server error", data: error}
    }
  };

  export default getCommentsFromClip;