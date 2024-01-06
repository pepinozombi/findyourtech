import React, { useState, useEffect } from "react";
import { GGST_CHARACTERS } from "../../utils/collections/characters";
import { PL_CHARACTERS } from "../../utils/collections/characters";
import { VIDEOGAMES } from "../../utils/collections/videogames";
import CharactersModal from "../CharactersModal";
import Cookies from 'universal-cookie';
import { Button } from "react-bootstrap";
import { PlusCircle } from "react-bootstrap-icons";

const CharactersModalController = ({
  techSelection,
  handleTechSelection,
  characterSelect, 
  setCharacterSelect,
  videogameCode
}) => {
  const cookies = new Cookies();
  const [showCharacterModal, toggleCharacterModal] = useState(false);
  const [videogameCharacters, setVideogameCharacters] = useState([]);
  const [selectVideogameName, setVideogameName] = useState(process.env.REACT_APP_VIDEOGAME_CODE);
  const [selectCharactersByTeam, setCharactersByTeam] = useState("");
  const [selectedItemId, setSelectedItemId] = useState(null);

  const [selectedVideogame, setSelectedVideogame] = useState("");
  //const [selectedCharacters, setSelectedCharacters] = useState([]);

  const closeCharacterModal = () => toggleCharacterModal(false);
  const openCharacterModal = () => {
    toggleCharacterModal(true)
  };


  useEffect(() => {
    if (Object.keys(characterSelect).length === 0) {
      selectVideogame(VIDEOGAMES.find(videojuego => videojuego.code === process.env.REACT_APP_VIDEOGAME_CODE))
    }
    // Runs after EVERY rendering
    handleTechSelection(selectedVideogame, characterSelect)
  }, [selectedVideogame, characterSelect]);

  useEffect(() => {
    if(videogameCode) {
      selectVideogame(VIDEOGAMES.find(videojuego => videojuego.code === videogameCode))
    }
  }, [videogameCode]);


  const selectVideogame = (videogame) => {
    //states
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

    //si no hay selectedItemId buscamos el primero vacío
    if (selectedItemId == null) {

      claveSeleccionada = "P1_0";

      if (claveSeleccionada) {
        setSelectedItemId(claveSeleccionada);
      }
    }

    //hacemos un shallow copy para forzar el re-render del componente
    let updateCharacterSelect = { ...characterSelect };
    updateCharacterSelect[claveSeleccionada] = character;

    setCharacterSelect(updateCharacterSelect)

    setNextItemId(claveSeleccionada);
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
    let updateCharacterSelect = { ...characterSelect };
    updateCharacterSelect[characterId] = {};

    setCharacterSelect(updateCharacterSelect)
  }

  return (
    <>
      <Button
        onClick={openCharacterModal}
        variant="outline-primary"
        className="w-100 ms-2 btn-tech mb-2"
        disabled={false}
        style={{ maxWidth: '175px', fontSize: '1em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
      >
        Add character <PlusCircle className="ms-2" />
      </Button>
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
    </>
  );
};

export default CharactersModalController;
