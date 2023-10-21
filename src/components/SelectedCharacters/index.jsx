import React from 'react'
import { BsFillTrash3Fill } from "react-icons/bs"

const SelectedCharacters = ({
    characterSelect,
    charactersByTeam,
    handleCharacterDeletion
}) => {

  const player1 = "P1";
  const player2 = "P2";

  const p1Names = Array(charactersByTeam)
  .fill()
  .map((_, index) => characterSelect[player1 + "_" + index]?.name);

  // Verifica si al menos un personaje en P2 tiene un nombre
  const hayPersonajesEnP1 = p1Names.some((name) => name);

  const p2Names = Array(charactersByTeam)
    .fill()
    .map((_, index) => characterSelect[player2 + "_" + index]?.name);

  // Verifica si al menos un personaje en P2 tiene un nombre
  const hayPersonajesEnP2 = p2Names.some((name) => name);

  return (
    <div>
      {charactersByTeam === 0 ? (
        <div></div>
      ) : (
        <div className="row">
          <div className='col-5 col-md-5 align-items-center'>
            <div className="row justify-content-center">
          {
              hayPersonajesEnP1 &&
              p1Names.map((name, index) => (
                name &&
                <div
                  onClick={() => handleCharacterDeletion(player1 + "_" + index)}
                  className={`col-4 
                                p-2 
                                bd-highligh 
                                characterFrame-mini`
                            }
                  key={characterSelect[player1 + "_" + index]?.name + player1 + "_" + index +"_pill"}
                  style={{ 
                    backgroundImage: `url(${characterSelect[player1 + "_" + index]?.image})`
                  }}
                >
                  <div 
                    className="d-flex justify-content-center bd-highlight characterFrameContent-mini delete-button"
                  >
                    <BsFillTrash3Fill className='align-self-center' size={30} />
                  </div>
                </div>
              ))
            } 
            </div> 
          </div>
          {hayPersonajesEnP2 && <div className='col-2 d-flex justify-content-center'>
            <div className="text-center vs">
            </div>
           </div>}
          <div className='col-5 col-md-5 align-items-center'>
            <div className="row justify-content-center">
            {
              hayPersonajesEnP2 &&
              p2Names.map((name, index) => (
                name &&
                <div
                  onClick={() => handleCharacterDeletion(player2 + "_" + index)}
                  className="characterFrame-mini"
                  key={characterSelect[player2 + "_" + index]?.name + player2 + "_" + index +"_pill"}
                  style={{ 
                    backgroundImage: `url(${characterSelect[player2 + "_" + index]?.image})`
                  }}
                >
                  <div 
                    className="d-flex justify-content-center bd-highlight characterFrameContent-mini delete-button"
                  >
                    <BsFillTrash3Fill className='align-self-center' size={30} />
                  </div>
                </div>
              ))
            }  
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SelectedCharacters;
