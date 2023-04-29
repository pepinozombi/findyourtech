import React from "react";
import { Modal } from "react-bootstrap";

const GamesModal = ({
  showGamesModal,
  closeGamesModal,
  games,
  handleSelection
}) => {
  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      show={showGamesModal}
      onHide={closeGamesModal}
    >
      <Modal.Header closeButton>
        <Modal.Title>Select your game</Modal.Title>
      </Modal.Header>
      <Modal.Body className="character-modal">
        {games.map((game) => (
          <div
            onClick={() => handleSelection(game)}
            className="image-wrapper"
            key={game.name}
          >
            <img
              style={{ maxWidth: "100%" }}
              src={game.image}
              alt={game.name}
            />
          </div>
        ))}
      </Modal.Body>
    </Modal>
  );
};

export default GamesModal;


