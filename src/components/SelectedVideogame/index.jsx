import React from 'react'
import { X } from "react-bootstrap-icons";

const SelectedVideogame = ({
    selectedVideogame,
    handleVideogameDeletion
}) => {
  return (
    <div>
        {
          selectedVideogame.length === 0 ? (
            <div></div>
          ):(
            <div className="d-flex justify-content-center bd-highlight">
              <div className="p-1 bd-highlight">Videogame: </div>
                {
                    <div 
                      className="p-1 bd-highlight"
                      key={selectedVideogame.id}
                    >
                      <span 
                      className="selected-item" 
                      
                      > 
                        <span>
                          {selectedVideogame.name}
                        </span>
                        <span 
                          className="x-button" 
                          onClick={() => handleVideogameDeletion(selectedVideogame)}
                        >
                          <X></X>
                        </span>
                      </span>
                    </div>}
            </div>
          )
        }
    </div>
  )
}

export default SelectedVideogame;
