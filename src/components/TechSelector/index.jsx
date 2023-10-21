import React, { useState, useEffect } from "react";
import { Button, Form, Row } from "react-bootstrap";
import { PlusCircle } from "react-bootstrap-icons";
import { GGST_CHARACTERS } from "../../utils/collections/characters";
import { PL_CHARACTERS } from "../../utils/collections/characters";
import { VIDEOGAMES } from "../../utils/collections/videogames";
import CharactersModal from "../CharactersModal";
import GamesModal from "../GamesModal";
import SelectedClipType from "../SelectedClipType";
import SelectedVideogame from "../SelectedVideogame";
import SelectedCharacters from "../SelectedCharacters";
import Cookies from 'universal-cookie';
import SelectedClipLevel from "../selectedClipLevel";

const TechSelector = ({
  techSelection,
  handleTechSelection,
  techLayout
}) => {
  const cookies = new Cookies();
  const [showCharacterModal, toggleCharacterModal] = useState(false);
  const [showGamesModal, toggleGamesModal] = useState(false);
  const [videogameCharacters, setVideogameCharacters] = useState([]);
  const [characterSelect, setCharacterSelect] = useState([]);
  const [selectVideogameName, setVideogameName] = useState("");
  const [selectCharactersByTeam, setCharactersByTeam] = useState("");
  const [selectedItemId, setSelectedItemId] = useState(null);

  const [selectedClipType, setSelectedClipType] = useState("");
  const [selectedClipLevel, setSelectedClipLevel] = useState("");
  const [selectedVideogame, setSelectedVideogame] = useState([]);
  const [selectedCharacters, setSelectedCharacters] = useState([]);

  const closeCharacterModal = () => toggleCharacterModal(false);
  const openCharacterModal = () => {
    toggleCharacterModal(true)
  };

  const closeGamesModal = () => toggleGamesModal(false);
  const openGamesModal = () => toggleGamesModal(true);


  useEffect(() => {
    // Runs after EVERY rendering
    handleTechSelection(selectedClipType, selectedClipLevel, selectedVideogame, selectedCharacters)
  }, [selectedClipType, selectedClipLevel, selectedVideogame, selectedCharacters]);

  const handleClipTypeSelection = (e) => {
    setSelectedClipType(e.target.value)
  }

  const handleClipLevelSelection = (e) => {
    setSelectedClipLevel(e.target.value)
  }

  const handleVideogameSelection = (videogame) => {
    selectVideogame(videogame)

  };

  const selectVideogame = (videogame) => {
    //states
    setSelectedCharacters([])
    setVideogameName(videogame.code)
    
    setCharactersByTeam(videogame.charactersByTeam)

    createCharacterSelectArray(videogame.charactersByTeam)

    //agregamos el game
    addVideogame(videogame)

    //agregamos los characters
    switch (videogame.code) {
      case "ggst":
        setVideogameCharacters(GGST_CHARACTERS)
        break;
      case "project-l":
        setVideogameCharacters(PL_CHARACTERS)
        break;
      default:
        setVideogameCharacters([])
        break;
    }

    setSelectedItemId("P1_0")
    //cerramos el modal
    toggleGamesModal(false)
  }

  //generamos el array con todos los muñecos
  //[P1_0: {…}, P2_0: {…}]
  const createCharacterSelectArray = (charactersByTeam) => {
    let characterSelectArray = [];
    let player1Prefix = "P1";
    let player2Prefix = "P2";

    //P1
    Array(charactersByTeam).fill().map((_, index) => (
      characterSelectArray[player1Prefix + "_" + index] = {}
    ));

    //P2
    Array(charactersByTeam).fill().map((_, index) => (
      characterSelectArray[player2Prefix + "_" + index] = {}
    ));

    setCharacterSelect(characterSelectArray)
  }

  const addVideogame = (videogame) => {

    setSelectedVideogame(videogame)
    cookies.remove('labVideogame', { path: '/' })
    cookies.set('labVideogame', videogame.name, { path: '/' })
  }

  const handleCharacterSelection = (character) => {

    
    let claveSeleccionada = selectedItemId;
    console.log(selectedItemId == null);
    //si no hay selectedItemId buscamos el primero vacío
    if (selectedItemId == null) {
      
      claveSeleccionada = "P1_0";
  
      if (claveSeleccionada) {
        setSelectedItemId(claveSeleccionada);
      }
    }

    //hacemos un shallow copy para forzar el re-render del componente
    let updateCharacterSelect = {...characterSelect};
    updateCharacterSelect[claveSeleccionada] = character;
    
    setCharacterSelect(updateCharacterSelect)

    setNextItemId(claveSeleccionada);

    console.log(updateCharacterSelect);
  };

  //obtenemos el siguiente objeto del characterSelect.
  //si es el ultimo lo ponemos a null
  const setNextItemId = (claveSeleccionada) => {
    const claves = Object.keys(characterSelect);
    const indiceSeleccionado = claves.indexOf(claveSeleccionada);

    if (indiceSeleccionado === -1 || indiceSeleccionado === claves.length - 1) {
      // La posición seleccionada no se encontró o es la última
      handleCharacterFrameSelection("P1_0");
      return;
    }

    handleCharacterFrameSelection(claves[indiceSeleccionado + 1]);
  }

  const handleCharacterFrameSelection = (itemId) => {
    console.log(itemId)
    setSelectedItemId(itemId);
  };


  const handleVideogameDeletion = (videogame) => {
    deleteSelectedVideogame(videogame)
  }

  const deleteSelectedVideogame = videogameName => {
    setSelectedVideogame([])
    setVideogameCharacters([])
    createCharacterSelectArray(selectCharactersByTeam)
  }

  const handleCharacterDeletion = (characterId) => {
    deleteSelectedCharacter(characterId)
  }

  const deleteSelectedCharacter = characterId => {
    //hacemos un shallow copy para forzar el re-render del componente
    let updateCharacterSelect = {...characterSelect};
    updateCharacterSelect[characterId] = {};
    
    setCharacterSelect(updateCharacterSelect)

    console.log(updateCharacterSelect);
  }

  return (
    <>
      <Row className="justify-content-center">

        <SelectedClipType
          selectedClipType={selectedClipType}
          handleClipTypeSelection={handleClipTypeSelection}
        />

        <SelectedClipLevel
          selectedClipLevel={selectedClipLevel}
          handleClipLevelSelection={handleClipLevelSelection}
        />

        <Button
          onClick={openGamesModal}
          variant="outline-primary"
          className="w-100 ms-1 btn-tech mb-2"
          disabled={false}
          style={{maxWidth: '175px', fontSize: '1em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
        >
          Select game <PlusCircle className="ms-2" />
        </Button>
        <Button
          onClick={openCharacterModal}
          variant="outline-primary"
          className="w-100 ms-1 btn-tech mb-2"
          disabled={false}
          style={{maxWidth: '175px', fontSize: '1em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}
        >
          Add character <PlusCircle className="ms-2" />
        </Button>
      </Row>

      <GamesModal
        showGamesModal={showGamesModal}
        closeGamesModal={closeGamesModal}
        games={VIDEOGAMES}
        handleSelection={handleVideogameSelection}
      />
      <CharactersModal
        showCharacterModal={showCharacterModal}
        closeCharacterModal={closeCharacterModal}
        characters={videogameCharacters}
        handleSelection={handleCharacterSelection}
        videogame={selectVideogameName}
        charactersByTeam={selectCharactersByTeam}
        handleCharacterFrameSelection={handleCharacterFrameSelection}
        selectedItemId={selectedItemId}
        selectedCharacters={characterSelect}
      />

      <SelectedVideogame
        selectedVideogame={selectedVideogame}
        handleVideogameDeletion={handleVideogameDeletion}
      />

      <SelectedCharacters
        characterSelect={characterSelect}
        charactersByTeam={selectCharactersByTeam}
        handleCharacterDeletion={handleCharacterDeletion}
      />

    </>
  );
};

export default TechSelector;
