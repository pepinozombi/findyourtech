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
            <div className="d-flex flex-row bd-highlight">
              <div className="p-1 bd-highlight">Videogame: </div>
                {
                  selectedVideogame.map(item => (
                    <div 
                      className="p-1 bd-highlight"
                      key={item.id}
                    >
                      <span 
                      className="selected-item" 
                      
                      > 
                        <span>
                          {item.videogame.name}
                        </span>
                        <span 
                          className="x-button" 
                          onClick={() => handleVideogameDeletion(item.videogame.name)}
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

export default SelectedVideogame;
