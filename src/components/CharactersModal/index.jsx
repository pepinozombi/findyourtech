import React from "react";
import { Modal } from "react-bootstrap";
import shortid from 'shortid';
import CharacterSelectFrames from "../CharacterSelectFrames";
import CharacterFrames from "../CharacterFrames";
import { useState } from "react";

const CharactersModal = ({
  showCharacterModal,
  closeCharacterModal,
  characters,
  handleSelection,
  videogame,
  charactersByTeam,
  selectedItemId,
  handleCharacterFrameSelection,
  selectedCharacters
}) => {

  const player1 = "P1";
  const player2 = "P2";

  const handleCharacterSelectionOnModal = (itemId) => {
    handleCharacterFrameSelection(itemId);
  };

  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      show={showCharacterModal}
      onHide={closeCharacterModal}
    >
      <Modal.Header closeButton>
      <div className="scroll-container">
        <div className="scroll-text">CHOOSE YOUR CHARACTERS</div>
      </div>
      </Modal.Header>
      {characters.length === 0 ? (
        <Modal.Body className="character-modal">
          <h2>Select a game first</h2>
        </Modal.Body>
      ):(
        <Modal.Body className="character-modal">
          <div className="container">
            <div className="row">
              <div className="col-5 col-md-5 align-items-center">
                
                  <CharacterSelectFrames
                    charactersByTeam={charactersByTeam ? charactersByTeam : 0}
                    player={player1}
                    handleCharacterFrameSelectionInFrame={handleCharacterSelectionOnModal}
                    selectedItemId={selectedItemId}
                    selectedCharacters={selectedCharacters}
                  />
              </div>
              <div className="col-2 d-flex justify-content-center">
                <div className="text-center vs">
                </div>
              </div>
              <div className="col-5 col-md-5 align-items-center">
                  <CharacterSelectFrames
                  charactersByTeam={charactersByTeam ? charactersByTeam : 0}
                  player={player2}
                  handleCharacterFrameSelectionInFrame={handleCharacterSelectionOnModal}
                  selectedItemId={selectedItemId}
                  selectedCharacters={selectedCharacters}
                />
              </div>
            </div>
            <CharacterFrames
              characters={characters}
              handleSelection={handleSelection}
            />
        </div>
        </Modal.Body>
      )}
      
      <Modal.Footer>
        Images credit goes to{" "}
        {videogame === "ggst" && (
          <a
            target="_blank"
            href="https://www.guiltygear.com/ggst/en/character/"
            rel="noreferrer"
          >
            GGST official page
          </a>
        )}
        {videogame === "project-l" && (
          <a
            target="_blank"
            href="https://project-l.riotgames.com/es-e"
            rel="noreferrer"
          >
            Project L official page
          </a>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default CharactersModal;


