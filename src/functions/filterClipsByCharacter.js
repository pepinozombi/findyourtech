
// export default function filterClipsByCharacters(
//   clips, 
//   characters, 
//   characterKeys, 
//   charactersByTeam
// ) {

//   const player1 = "P1";
//   const player2 = "P2";

//   //
//   const p1Names = Array(charactersByTeam)
//   .fill()
//   .map((_, index) => characters[player1 + "_" + index]?.name);

//   // Verifica si al menos un personaje en P2 tiene un nombre
//   const hayPersonajesEnP1 = p1Names.some((name) => name);

//   const p2Names = Array(charactersByTeam)
//     .fill()
//     .map((_, index) => characters[player2 + "_" + index]?.name);

//   // Verifica si al menos un personaje en P2 tiene un nombre
//   const hayPersonajesEnP2 = p2Names.some((name) => name);
  
//   console.log('p1Names');
//   console.log(p1Names);
//   console.log('hayPersonajesEnP1');
//   console.log(hayPersonajesEnP1);

//   console.log('p2Names');
//   console.log(p2Names);
//   console.log('hayPersonajesEnP2');
//   console.log(hayPersonajesEnP2);



//     // Obtén un array de las claves de personajes de la colección de personajes
    
//     // Filtra los clips que contienen personajes en cualquiera de las dos posiciones 'P1' o 'P2'
//     const filteredClips = clips.filter((clip) => {
//       if (hayPersonajesEnP1) {

//       }

//       if (hayPersonajesEnP2) {

//       }
//     });
    
//     return clips;
// }


function filterClipsByCharacters(clips, characters, charactersByTeam) {
  return clips.filter((clip) => {
    // Obtén los personajes de P1 y P2 según el tipo de juego
    const team1 = charactersByTeam === '1' ? ['P1_0'] : ['P1_0', 'P1_1'];
    const team2 = charactersByTeam === '1' ? ['P2_0'] : ['P2_0', 'P2_1'];

    // Función para verificar si un personaje está en el equipo dado
    const isCharacterInTeam = (team, characterName) => {
      for (const key of team) {
        if (characters[key] && characters[key].name === characterName) {
          return true;
        }
      }
      return false;
    };

    // Verifica si al menos un personaje de P1 está en el clip
    const isTeam1InClip = team1.some((key) =>
      characters[key] ? isCharacterInTeam(team1, clip[key].name) : false
    );

    // Verifica si al menos un personaje de P2 está en el clip
    const isTeam2InClip = team2.some((key) =>
      characters[key] ? isCharacterInTeam(team2, clip[key].name) : false
    );

    // Devuelve true si el clip contiene al menos un personaje de cada equipo
    return isTeam1InClip && isTeam2InClip;
  });
}