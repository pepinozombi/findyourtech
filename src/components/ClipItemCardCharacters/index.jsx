import React, { useState, useEffect } from "react";
import { Tooltip } from 'react-tooltip'

const ClipItemCardCharacters = ({
    characterSelect,
    charactersByTeam,
    tooltipkey
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
        <div className="row justify-content-center">
          <div className='col-5 col-md-5 align-items-center'>
            <div className="row justify-content-center">
            {
              hayPersonajesEnP1 &&
              p1Names.map((name, index) => (
                name &&
                <div
                  className={`col-4 
                                p-2 
                                bd-highligh 
                                characterFrame-micro`
                            }
                  key={characterSelect[player1 + "_" + index]?.name + player1 + "_" + index +"_pill_" + tooltipkey}
                  style={{ 
                    backgroundImage: `url(${characterSelect[player1 + "_" + index]?.image})`
                  }}
                  data-tooltip-id={characterSelect[player1 + "_" + index]?.name + "_" +  player1 + "_" + index +"_tooltip_" + tooltipkey}
                  data-tooltip-content={characterSelect[player1 + "_" + index]?.name}
                  data-tooltip-place="top"
                >
                </div>
              ))
            } 
            {
              hayPersonajesEnP1 &&
              p1Names.map((name, index) => (
                name &&
                <Tooltip 
                  key={characterSelect[player1 + "_" + index]?.name + "_" +  player1 + "_" + index +"_tooltip_" + tooltipkey}
                  id={characterSelect[player1 + "_" + index]?.name + "_" +  player1 + "_" + index +"_tooltip_" + tooltipkey}
                />
              ))
            } 
            </div> 
          </div>
          {hayPersonajesEnP2 && <div className='col-2 d-flex justify-content-center'>
            <div className="text-center vs-micro">
            </div>
           </div>}
          <div className='col-5 col-md-5 align-items-center'>
            <div className="row justify-content-center">
            {
              hayPersonajesEnP2 &&
              p2Names.map((name, index) => (
                name &&
                <div
                  className="characterFrame-micro"
                  key={characterSelect[player2 + "_" + index]?.name + player2 + "_" + index +"_pill_" + tooltipkey}
                  style={{ 
                    backgroundImage: `url(${characterSelect[player2 + "_" + index]?.image})`
                  }}
                  data-tooltip-id={characterSelect[player2 + "_" + index]?.name + "_" + player2 + "_" + index +"_tooltip_" + tooltipkey}
                  data-tooltip-content={characterSelect[player2 + "_" + index]?.name}
                  data-tooltip-place="top"
                >
                </div>
              ))
            }
            {
              hayPersonajesEnP2 &&
              p2Names.map((name, index) => (
                name &&
                  <Tooltip 
                    key={characterSelect[player2 + "_" + index]?.name + "_" + player2 + "_" + index +"_tooltip_" + tooltipkey}
                    id={characterSelect[player2 + "_" + index]?.name + "_" + player2 + "_" + index +"_tooltip_" + tooltipkey} 
                  />
              ))
            }
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ClipItemCardCharacters;
