import React from "react";
import shortid from 'shortid';

const CharacterSelectFrames = ({
    player,
    charactersByTeam,
    handleCharacterFrameSelectionInFrame,
    selectedItemId,
    selectedCharacters
}) => {

    return (
        <div className="row justify-content-center">
            {Array(charactersByTeam).fill().map((_, index) => (
                <div 
                    key={shortid.generate()}
                    id={player + "_" + index}
                    className={`col-4 
                                p-2 
                                bd-highligh 
                                characterFrame 
                                characterSelectFrame 
                                ${player + "_" + index === selectedItemId ? 'selectedCharacterFrame' : ''}`
                            }
                    onClick={() => handleCharacterFrameSelectionInFrame(player + "_" + index)}
                    style={{
                        backgroundImage: `url(${
                          selectedCharacters[player + "_" + index]?.image || 'https://wow.zamimg.com/images/wow/icons/large/spell_holy_surgeoflight.jpg'
                        })`,
                        transition: 'background-image 0.3s ease-in-out'
                      }}
                >
                    <div className="d-flex align-items-end selectedCharacterFrameContent">
                        <div>
                            {selectedCharacters[player + "_" + index].name}
                        </div>
                    </div>
                </div>
            ))}
            
        </div>
    );
}

export default CharacterSelectFrames;