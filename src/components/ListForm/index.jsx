// Nuevo componente para el formulario de lista
import React, { useState, useRef, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import "./listForm.css";
import SelectedListType from '../SelectedListType';
import SelectedClipLevel from '../selectedClipLevel';
import CharactersModalController from '../CharactersModalController';
import SelectedCharactersController from '../SelectedCharactersController';

const ListForm = ({ showModal, handleClose, handleSubmit, formTitle, listId }) => {
  const [listName, setListName] = useState('');
  const [listDescription, setListDescription] = useState('');
  const [selectedListType, setSelectedListType] = useState('');
  const [selectedListLevel, setSelectedListLevel] = useState('');
  const [techSelection, setTechSelection] = useState(null)
  const [characterSelect, setCharacterSelect] = useState([]);
  const [charactersByTeam, setCharactersByTeam] = useState(1);
  const [listProps, setListProps] = useState(null);
  const [videoGameCode, setVideoGameCode] = useState();

  const handleInputChange = (event) => {
    setListName(event.target.value);
  };

  const handleFormSubmit = () => {
    handleSubmit(listProps)
    setListName("")
    setListDescription("")
    setTechSelection(null)
    setCharacterSelect([])
    let resetVideoGameCode = process.env.REACT_APP_VIDEOGAME_CODE;
    setVideoGameCode(resetVideoGameCode)
    handleClose();
  };

  const textareaRef = useRef(null);

  const autoExpandTextarea = () => {
    const textarea = textareaRef.current;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }

  const handleDescriptionChange = (event) => {
    setListDescription(event.target.value);
    autoExpandTextarea();
  }

  const handleListTypeSelection = (event) => {
    console.log(event.target.value);
    setSelectedListType(event.target.value)
  }

  const handleListLevelSelection = (event) => {
    setSelectedListLevel(event.target.value)
  }

  const handleTechSelection = (selectedVideogame, characterSelect) => {
    setCharactersByTeam(selectedVideogame.charactersByTeam)
    setTechSelection({ selectedVideogame, characterSelect })
  }

  useEffect(() => {
    setListProps({ characterSelect, listName, listDescription, selectedListLevel, selectedListType, selectedVideogame: techSelection?.selectedVideogame })
  }, [characterSelect, listName, listDescription, selectedListLevel, selectedListType, techSelection]);


  useEffect(() => {
    if (listId) {

    }
  }, [listId])

  const getListProps = (id) => {
    
  }
  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{formTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <div className='mb-3'>
            <Form.Group controlId="formListName">
              <div className='mb-3'>
                <Form.Label>List Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter list name"
                  value={listName}
                  onChange={handleInputChange}
                />
              </div>
              <Form.Label>Description</Form.Label>
              <textarea
                ref={textareaRef}
                placeholder={'Explain the purpose of the list (if it has a purpose)...'}
                value={listDescription}
                onChange={handleDescriptionChange}
                className="form-control description-textarea"
                rows={1} // Inicialmente ocupa una fila
              />
            </Form.Group>
          </div>
          <Form.Label>Type and level</Form.Label>
          <div className="row g-3 align-items-center mb-3">
            <SelectedListType
              selectedListType={selectedListType}
              handleListTypeSelection={handleListTypeSelection}
            />
            <SelectedClipLevel
              selectedClipLevel={selectedListLevel}
              handleClipLevelSelection={handleListLevelSelection}
            />
          </div>
          <div className="row align-items-center mb-3">
            <Form.Label>Characters</Form.Label>
            <div className='col-12'>

              <CharactersModalController
                techSelection={techSelection}
                handleTechSelection={handleTechSelection}
                characterSelect={characterSelect}
                setCharacterSelect={setCharacterSelect}
                videogameCode={videoGameCode}
              />

              <SelectedCharactersController
                characterSelect={characterSelect}
                setCharacterSelect={setCharacterSelect}
                charactersByTeam={charactersByTeam}
              />
            </div>
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleFormSubmit}>
          Save List
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ListForm;