import { app } from "../firebase/config";
import { getFirestore, collection, getDocs, query, orderBy, where } from "firebase/firestore";
import filterClipsByCharacters from "./filterClipsByCharacter";
import isCharacterInObject from "./isCharacterInObject";
import filterClipsBySearchText from "./filterClipsBySearchText";

const db = getFirestore(app);

export default async function getAllClips(
  techSelection,
  searchText
) {

  if(Object.keys(techSelection).length !== 0) {
    let clips = [];  

    //esto tambien
    const ref = collection(db, "ClipItemCard");
    let qBase = query(ref);
    let q1, q2, q3, q4;

    if (techSelection.selectedClipType) {
      qBase = query(qBase, where('tech.selectedClipType', '==', techSelection.selectedClipType));
    }
    
    if (techSelection.selectedClipLevel) {
      qBase = query(qBase, where('tech.selectedClipLevel', '==', techSelection.selectedClipLevel));
    }

    
      let hasCharacters = techSelection && await isCharacterInObject(techSelection.selectedCharacters);
      if(hasCharacters) {
        console.log('hascharacters');
        
        q1 = qBase;
        q2 = qBase;
        q3 = qBase;
        q4 = qBase;

        const arrayP1 = [];
        const arrayP2 = [];
        
        let characterData = techSelection.selectedCharacters;

        for (const key in characterData) {
          if (key.startsWith('P1_') && characterData[key]?.name) {
            arrayP1.push(characterData[key].name);
          } else if (key.startsWith('P2_') && characterData[key]?.name) {
            arrayP2.push(characterData[key].name);
          }
        }

        for (const key in characterData) {
          switch (key) {
              case "P1_0":
                if(characterData[key]?.name) {
                  console.log(characterData[key]?.name);
                  q1 = query(q1, where('indexes.charactersP1', 'array-contains-any', [characterData[key]?.name]));
                  q1 = query(q1, orderBy('createdAt', 'desc'));
                }
              break;
              case "P1_1":
                if(characterData[key]?.name) {
                  console.log(characterData[key]?.name);
                  q2 = query(q2, where('indexes.charactersP1', 'array-contains-any', [characterData[key]?.name]));
                  q2 = query(q2, orderBy('createdAt', 'desc'));
                }
              break;
              case "P2_0":
                if(characterData[key]?.name) {
                  console.log(characterData[key]?.name);
                  q3 = query(q3, where('indexes.charactersP2', 'array-contains-any', [characterData[key]?.name]));
                  q3 = query(q3, orderBy('createdAt', 'desc'));
                }
              break;
              case "P2_1":
                if(characterData[key]?.name) {
                  console.log(characterData[key]?.name);
                  q4 = query(q4, where('indexes.charactersP2', 'array-contains-any', [characterData[key]?.name]));
                  q4 = query(q4, orderBy('createdAt', 'desc'));
                }
              break;
            default:
              break;
          }
        }

      }
    

    qBase = query(qBase, orderBy('createdAt', 'desc'));
    
    const querySnapshot1 = await getDocs(qBase);
    const docs1 = querySnapshot1.docs;

    let filteredQuery;

    if (hasCharacters) {
      const consultas = [q1, q2, q3, q4];
    
      // Usamos Promise.all para esperar a que todas las consultas se completen en paralelo.
      const consultasPromises = consultas.map(async (consulta) => {
        const querySnapshot = await getDocs(consulta);
        return querySnapshot.docs;
      });
    
      // Resolvemos todas las promesas.
      const resultadosConsultas = await Promise.all(consultasPromises);
    
      const documentosComunes = docs1.filter((doc1) => {
        // Verificamos si el documento está presente en todas las consultas.
        return resultadosConsultas.every((docs) =>
          docs.some((doc) => doc.id === doc1.id)
        );
      });
    
      console.log(documentosComunes);
    
      filteredQuery = [...documentosComunes];
    } else {
      filteredQuery = [...querySnapshot1.docs];
    }
    
    filteredQuery.forEach((doc) => {
      clips.push({ id: doc.id, ...doc.data() });
    });

    console.log(clips);

    clips = filterClipsBySearchText(clips, searchText);

    return clips;
  } else {
    return null;
  }

}
