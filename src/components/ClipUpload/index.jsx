import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import { PlusCircle } from "react-bootstrap-icons";
import {
  SFV_CHARACTERS,
  GGST_CHARACTERS,
} from "../../utils/collections/characters";
import { VIDEOGAMES } from "../../utils/collections/videogames";
import ClipItemCard from "../../components/ClipItemCard";
import { AuthenticationContext } from "../../App";
import createNewClip from "../../functions/createNewClip";
import CharactersModal from "../../components/CharactersModal";
import GamesModal from "../GamesModal";
import { useNavigate } from "react-router";
import shortid from 'shortid';
import Cookies from 'universal-cookie';
import SelectedClipType from "../SelectedClipType";
import SelectedVideogame from "../SelectedVideogame";
import SelectedCharacters from "../SelectedCharacters";

export default function ClipUpload({
    filterSelection,
    handleFilterSelection}) {
  const { user, setUser } = useContext(AuthenticationContext);
  const navigate = useNavigate();

  const [charactersSelected, setCharactersSelected] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [formFields, setFormFields] = useState({
    clipVideogame: "",
    clipType: "",
    clipTitle: "",
    clipDescription: "",
    clipURL: "",
  });
  

  const cookies = new Cookies();
  const [showGamesModal, toggleGamesModal] = useState(false);
  const [selectedClipType, setSelectedClipType] = useState("");
  const [selectedCharacters, setSelectedCharacters] = useState([]);
  const [selectedVideogame, setSelectedVideogame] = useState([]);

  const closeCharacterModal = () => toggleCharacterModal(false);
  const openCharacterModal = () => toggleCharacterModal(true);

  const closeGamesModal = () => toggleGamesModal(false);
  const openGamesModal = () => toggleGamesModal(true);

  const [showCharacterModal, toggleCharacterModal] = useState(false);
  const [selectVideogameCharacters, setVideogameCharacters] = useState([]);
  const [selectVideogameName, setVideogameName] = useState("");

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

const addCharacter = (character) => {
   
  setSelectedCharacters([
    ...selectedCharacters,
    {id: shortid.generate(), character}
  ])
}

  useEffect(() => {
    switch (formFields.clipVideogame) {
      case "sfv":
        setCharacters(SFV_CHARACTERS);
        break;
      case "ggst":
        setCharacters(GGST_CHARACTERS);
        break;
      default:
        setCharacters(GGST_CHARACTERS);
        break;
    }
  }, [formFields.clipVideogame]);

  useEffect(() => {
    // Runs after EVERY rendering
    handleFilterSelection(selectedClipType,selectedVideogame,selectedCharacters)
  },[selectedClipType,selectedVideogame,selectedCharacters]);  

  const handleCharacterSelection = (character) => {
    setCharactersSelected([...charactersSelected, character]);
    if (charactersSelected.length > 0) {
      toggleCharacterModal(false);
    }
  };

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

  const createClip = () => {
    const { clipVideogame, clipType, clipTitle, clipDescription, clipURL } =
      formFields;
    const {
      displayName,
      photoURL,
      reloadUserInfo: { screenName },
    } = user;

    createNewClip({
      videogame: clipVideogame,
      user: {
        name: displayName,
        photoURL,
        twitter: `https://twitter.com/${screenName}`,
      },
      url: clipURL,
      type: clipType,
      title: clipTitle,
      description: clipDescription,
      characters: charactersSelected,
    }).then(() => navigate('/'));
  };

  return (
    <>
      <Container>
        <Row className="mt-5">
          <h1>UploadYourTech</h1>
          <Col sm={6}>
            <Form>
              <Form.Group className="mb-3" controlId="selectVideogame">
                <Form.Label className="mt-2">Videogame</Form.Label>
                <Button
                  onClick={openGamesModal}
                  variant="outline-primary"
                  className="ms-2"
                  disabled={false}
                >
                  Add game <PlusCircle className="ms-2" />
                </Button>
                <SelectedVideogame
                    selectedVideogame={selectedVideogame}
                    handleVideogameDeletion={handleVideogameDeletion}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="selectClipType">
                <Form.Label className="mt-2">Clip type</Form.Label>
                <Form.Select
                  value={formFields.clipType}
                  onChange={(e) =>
                    setFormFields({ ...formFields, clipType: e.target.value })
                  }
                  aria-label="Select clip type"
                >
                  <option value="">Select clip type...</option>
                  <option value="tech">Tech</option>
                  <option value="match">Match</option>
                  <option value="random">Random</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="uploadFormTitle">
                <Form.Label className="mt-2">Title</Form.Label>
                <Form.Control
                  value={formFields.clipTitle}
                  onChange={(e) =>
                    setFormFields({ ...formFields, clipTitle: e.target.value })
                  }
                  placeholder="Clip title"
                />
                <Form.Text className="text-muted">
                  Explain the clip in a few words.
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3" controlId="uploadFormDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  value={formFields.clipDescription}
                  onChange={(e) =>
                    setFormFields({
                      ...formFields,
                      clipDescription: e.target.value,
                    })
                  }
                  as="textarea"
                  placeholder="Clip description"
                />
                <Form.Text className="text-muted">
                  Write here how the tech has to be implemented or highlight
                  your match moments.
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3" controlId="characterSelect">
                <Form.Label>Characters</Form.Label>
                <div className="characters-selected">
                  {charactersSelected.map((character) => (
                    <div key={character.name} className="character">
                      <img src={character.image} alt={character.name} />
                      <span>{character.name}</span>
                    </div>
                  ))}
                </div>
                <Button
                  onClick={openCharacterModal}
                  variant="outline-primary"
                  style={{ width: "100%" }}
                  disabled={false}
                >
                  Add character <PlusCircle className="ms-2" />
                </Button>
                
                <SelectedCharacters
                    selectedCharacters={selectedCharacters}
                    handleCharacterDeletion={handleCharacterDeletion}
                />

                <Button
                  onClick={createClip}
                  variant="primary"
                  style={{ width: "100%", marginTop: "10px" }}
                  disabled={
                    formFields.clipType === "" || formFields.clipURL === ""
                  }
                >
                  Create clip!
                </Button>
              </Form.Group>
            </Form>
          </Col>
          <Col sm={6}>
            <Form>
              <Form.Group className="mb-3" controlId="clipURL">
                <Form.Label className="mt-2">Video URL</Form.Label>
                <Form.Control
                  value={formFields.clipURL}
                  onChange={(e) =>
                    setFormFields({ ...formFields, clipURL: e.target.value })
                  }
                  placeholder="Clip URL"
                />
                <Form.Text className="text-muted">
                  {"Paste here your clip URL (Youtube, Twitch, Stremeable...)"}
                </Form.Text>
              </Form.Group>
            </Form>
            <Form.Label>Preview</Form.Label>
            <ClipItemCard
              clipURL={formFields.clipURL}
              clipTitle={formFields.clipTitle}
              clipDescription={formFields.clipDescription}
              charactersSelected={charactersSelected}
              userName={user.displayName}
              userPhotoURL={user.photoURL}
              userTwitterURL={``}
            />
          </Col>
        </Row>
      </Container>
      <CharactersModal
        showCharacterModal={showCharacterModal}
        closeCharacterModal={closeCharacterModal}
        characters={selectVideogameCharacters}
        handleSelection={handleCharacterSelection}
        videogame={selectVideogameName}
      />
      <GamesModal
        showGamesModal={showGamesModal}
        closeGamesModal={closeGamesModal}
        games={VIDEOGAMES}
        handleSelection={handleVideogameSelection}
      />
    </>
  );
}
