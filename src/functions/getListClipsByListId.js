import { app } from "../firebase/config";
import {
  getFirestore,
  collection,
  getDocs, 
  query, 
  where,
} from "firebase/firestore";

const db = getFirestore(app);

const getListClipsByListId = async (listId) => {
  
    if(!listId) {return;}

    let clips = []; 

    const collectionRef = collection(db, "ListClip");
    let qUser = query(collectionRef);
    qUser = query(qUser, where("listId", "==", listId));
    
    try {
      const querySnapshot = await getDocs(qUser);

      if (!querySnapshot.empty) {

        querySnapshot.forEach((doc) => {
          clips.push(doc.data().clipId);
        });

        return {status: 200, message: "OK", data: clips};
      } else {
        return {status: 404,  message: "Not found", data: "No se encontraron los clips"}
      }
    } catch (error) {
      console.log('Error al buscar clips:', error);
      return {status: 500,  message: "Server error", data: error}
    }
  };

  export default getListClipsByListId;