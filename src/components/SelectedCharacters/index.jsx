import React from 'react'
import { X } from "react-bootstrap-icons";

const SelectedCharacters = ({
    selectedCharacters,
    handleCharacterDeletion
}) => {
  return (
    <div>
        {
          selectedCharacters.length === 0 ? (
            <div></div>
          ):(
            <div className="d-flex flex-row bd-highlight mb-3">
              <div className="p-1 bd-highlight">Characters: </div>
                {
                  selectedCharacters.map(item => (
                    <div 
                      className="p-1 bd-highlight"
                      key={item.id}
                    >
                      <span 
                        className="selected-item" 
                      > 
                        <span>
                          {item.character.name}
                        </span>
                        <span 
                          className="x-button" 
                          onClick={() => handleCharacterDeletion(item.character.name)}
                        >
                          <X></X>
                        </span>
                      </span>
                    </div>
                  ))}
              </div>
          )
        }
    </div>
  )
}

export default SelectedCharacters;
