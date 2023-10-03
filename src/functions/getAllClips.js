import { app } from "../firebase/config";
import { getFirestore, collection, getDocs, query, orderBy, where } from "firebase/firestore";

const db = getFirestore(app);

export default async function getAllClips(
  techSelection,
  searchText
) {

  const clips = [];
  const collectionRef = collection(db, "ClipItemCard");
  //const queryDate = query(collectionRef, orderBy("createdAt", "description"));

  //esto funciona
  //const querySnapshot = await getDocs(collection(db, "ClipItemCard"), orderBy('createdAt', 'desc'));
  
  //preparamos la query
  // if(techSelection) {
    
  //   if (techSelection.selectedVideogame && techSelection.selectedVideogame[0] != undefined) {
  //     console.log(techSelection.selectedVideogame[0]);
  //     filteredQuery = where(
  //       filteredQuery, 
  //       'selectedVideogame[0].videogame.code', 
  //       '==', 
  //       techSelection.selectedVideogame[0].videogame.code
  //     );
  //   }

  //   if (techSelection.selectedCharacters && techSelection.selectedCharacters != []) {
  //     techSelection.selectedCharacters.forEach(character => {
  //       filteredQuery = where(
  //         filteredQuery, 
  //         'selectedVideogame', 
  //         'array-contains', 
  //         character.character.name
  //       );
  //     });
      
  //   }
  //   //console.log(filteredQuery.docs);
  //   if (techSelection.selectedClipLevel) {
  //     filteredQuery = where(
  //       filteredQuery, 
  //       'selectedClipLevel', 
  //       '==', 
  //       techSelection.selectedClipLevel
  //     );
  //   }

  //   if (techSelection.selectedClipType) {
  //     filteredQuery = where(
  //       filteredQuery, 
  //       'selectedClipType', 
  //       '==', 
  //       techSelection.selectedClipType
  //     );
  //   }
  // }

  

  //esto tambien
  const ref = collection(db, "ClipItemCard");
  let q1 = query(ref);
  
  if (searchText) {
    // Utiliza el operador ">=" para realizar una búsqueda por prefijo
    // Utiliza el operador "<=" para realizar una búsqueda por sufijo
    q1 = query(ref, where('title', '>=', searchText), where('title', '<=', searchText + '\uf8ff'));
    q1 = query(ref, where('description', '>=', searchText), where('description', '<=', searchText + '\uf8ff'));
  }
  
  const querySnapshot1 = await getDocs(q1);

  const filteredQuery = [...querySnapshot1.docs];
  
  filteredQuery.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    //console.log(doc.id, " => ", doc.data());
    clips.push(doc.data());
  });

  
  return clips;
}
