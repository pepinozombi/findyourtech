import React, { useState, useEffect } from "react";
import { Button, Form, Stack } from "react-bootstrap";
import { PlusCircle } from "react-bootstrap-icons";
import { SFV_CHARACTERS } from "../../utils/collections/characters";
import { GGST_CHARACTERS } from "../../utils/collections/characters";
import { VIDEOGAMES } from "../../utils/collections/videogames";
import CharactersModal from "../CharactersModal";
import shortid from 'shortid';
import GamesModal from "../GamesModal";
import SelectedClipType from "../SelectedClipType";
import SelectedVideogame from "../SelectedVideogame";
import SelectedCharacters from "../SelectedCharacters";
import Cookies from 'universal-cookie';

const TechSelector = ({
    techSelection,
    handleTechSelection,
    techLayout
}) => {
    const cookies = new Cookies();
    const [showCharacterModal, toggleCharacterModal] = useState(false);
    const [showGamesModal, toggleGamesModal] = useState(false);
    const [selectVideogameCharacters, setVideogameCharacters] = useState([]);
    const [selectVideogameName, setVideogameName] = useState("");

    const [selectedClipType, setSelectedClipType] = useState("");
    const [selectedVideogame, setSelectedVideogame] = useState([]);
    const [selectedCharacters, setSelectedCharacters] = useState([]);

    const closeCharacterModal = () => toggleCharacterModal(false);
    const openCharacterModal = () => toggleCharacterModal(true);
  
    const closeGamesModal = () => toggleGamesModal(false);
    const openGamesModal = () => toggleGamesModal(true);
  

    useEffect(() => {
        // Runs after EVERY rendering
        handleTechSelection(selectedClipType, selectedVideogame, selectedCharacters)
    }, [selectedClipType, selectedVideogame, selectedCharacters]);

    const handleClipTypeSelection = (e) => {
        setSelectedClipType(e.target.value)
      }
    
      const handleVideogameSelection = (videogame) => {
        selectVideogame(videogame)
        
      };
    
      const selectVideogame = (videogame) => {
          setSelectedCharacters([])
          addVideogame(videogame)
          setVideogameName(videogame.code)
      
          switch (videogame.code) {
            case "sfv":
              setVideogameCharacters(SFV_CHARACTERS)
              break;
            case "ggst":
              setVideogameCharacters(GGST_CHARACTERS)
              break;
            default:
              setVideogameCharacters([])
              break;
          }
      
          toggleGamesModal(false)
    
        
      }
    
      const addVideogame = (videogame) => {
    
        setSelectedVideogame([
          {id: shortid.generate(), videogame}
        ])
        cookies.remove('labVideogame', { path: '/' })
        cookies.set('labVideogame', videogame.name, { path: '/' })
      }
    
      const handleCharacterSelection = (character) => {
        addCharacter(character)
      };
    
      const addCharacter = (character) => {
       
        setSelectedCharacters([
          ...selectedCharacters,
          {id: shortid.generate(), character}
        ])
      }
    
      const handleVideogameDeletion = (videogame) => {
        deleteSelectedVideogame(videogame)
      }
    
      const deleteSelectedVideogame = videogameName => {
        const arrayFilter = selectedVideogame.filter(videogame => videogame.videogame.name !== videogameName)
        setSelectedVideogame(arrayFilter)
        setVideogameCharacters([])
    
      }
    
      const handleCharacterDeletion = (character) => {
        deleteSelectedCharacter(character)
      }
    
      const deleteSelectedCharacter = characterName => {
          const arrayFilter = selectedCharacters.filter(character => character.character.name !== characterName)
          setSelectedCharacters(arrayFilter)
      }

      return (
        <>
          <Stack direction={techLayout}>
            
            <SelectedClipType
              selectedClipType={selectedClipType}
              handleClipTypeSelection={handleClipTypeSelection}
            />
    
            <Button
              onClick={openGamesModal}
              variant="outline-primary"
              className="ms-5"
              disabled={false}
            >
              Add game <PlusCircle className="ms-2" />
            </Button>
            <Button
              onClick={openCharacterModal}
              variant="outline-primary"
              className="ms-4"
              disabled={false}
            >
              Add character <PlusCircle className="ms-2" />
            </Button>
            
          </Stack>
    
          <GamesModal
            showGamesModal={showGamesModal}
            closeGamesModal={closeGamesModal}
            games={VIDEOGAMES}
            handleSelection={handleVideogameSelection}
          />
          <CharactersModal
            showCharacterModal={showCharacterModal}
            closeCharacterModal={closeCharacterModal}
            characters={selectVideogameCharacters}
            handleSelection={handleCharacterSelection}
            videogame={selectVideogameName}
          />
          
          <SelectedVideogame
            selectedVideogame={selectedVideogame}
            handleVideogameDeletion={handleVideogameDeletion}
          />
    
          <SelectedCharacters
            selectedCharacters={selectedCharacters}
            handleCharacterDeletion={handleCharacterDeletion}
          />
          
        </>
      );
};

export default TechSelector;
