import React from "react";

const CharacterFrames = ({
  characters,
  handleSelection,
}) => {

    return (
      <div className="row justify-content-center">
          {characters.map((character) => (
            <div
              onClick={() => handleSelection(character)}
              className="characterFrame"
              key={character.name}
              style={{ 
                backgroundImage: `url(${character.image})`
              }}
            >
              <div 
                className="d-flex align-items-end characterFrameContent"
              >
                <div>
                    {character.name}
                </div>
              </div>
            </div>
          ))}
      </div>
    );
}

export default CharacterFrames;
