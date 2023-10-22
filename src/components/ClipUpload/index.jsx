import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import ClipItemCard from "../../components/ClipItemCard";
import createNewClip from "../../functions/createNewClip";
import { useNavigate } from "react-router";
import Cookies from 'universal-cookie';
import TechSelector from '../TechSelector'
import GameVersions from '../GameVersions'
import { TECH_LAYOUT } from "../../utils/collections/layout";
import { AuthenticationContext } from "../../App";
import { VIDEOGAME_VERSIONS } from '../../utils/collections/videogameVersions'

export default function ClipUpload({
    filterSelection,
    handleFilterSelection}) {
  const navigate = useNavigate();

  const [charactersSelected, setCharactersSelected] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [formFields, setFormFields] = useState({
    clipTech: [],
    clipTitle: "",
    clipDescription: "",
    clipURL: "",
    userName: "", 
    userPhotoURL: "", 
    userTwitterURL: ""
  });

  const cookies = new Cookies();

  const [searchText, setSearchText] = useState("");
  const [userName,       setUserName] = useState("");
  const [userPhotoURL,   setUserPhotoURL] = useState("");
  const [userTwitterURL, setUserTwitterURL] = useState("");
  const [selectedVideogameVersion, setSelectedVideogameVersion] = useState("");

  const [techSelection, setTechSelection] = React.useState([]);
  const { user, setUser } = useContext(AuthenticationContext);

  useEffect(() => {
    // Runs after EVERY rendering
    handleFilterSelection(techSelection)
    handleLoggedUser()
    
    setFormFields({ ...formFields, clipTech: techSelection })
  }, [techSelection, searchText]);

  const handleLoggedUser = () => {
    setUserName(user.displayName)
    setUserPhotoURL(user.photoURL)
    //setUserTwitterURL(user.reloadUserInfo.screenName)
  }

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value)
  }


  const handleTechSelection = (selectedClipType, selectedClipLevel, selectedVideogame, characterSelect) => {
    setTechSelection({selectedClipType, selectedClipLevel, selectedVideogame, characterSelect})
  }

  const handleGameVersionSelection = (e) => {
    setSelectedVideogameVersion(e)
  }

  const createClip = () => {
    const { clipTech, clipTitle, clipDescription, clipURL } =
      formFields;

      let defaultVersion = selectedVideogameVersion;
      if(defaultVersion === "") {
        defaultVersion = VIDEOGAME_VERSIONS[clipTech.selectedVideogame?.code][0].version;
      }

      // console.log(
      //   {
      //     tech: clipTech,
      //     url: clipURL,
      //     title: clipTitle,
      //     description: clipDescription,
      //     titleDescription: clipTitle + clipDescription,
      //     selectedVideogameVersion: defaultVersion,
      //     user: {name: userName,
      //           photoURL: userPhotoURL,
      //           twitter: userTwitterURL}
      //   }
      // )
    createNewClip({
      tech: clipTech,
      url: clipURL,
      title: clipTitle,
      description: clipDescription,
      titleDescription: clipTitle + clipDescription,
      selectedVideogameVersion: selectedVideogameVersion,
      user: { name: userName,
              photoURL: userPhotoURL,
              twitter: userTwitterURL}
    }).then(() => navigate('/'));
  };

  return (
    <>
      <Container>
        <Row className="mt-5">
          <h1>UploadYourTech</h1>
          <Col sm={6}>
            <Form>
                <TechSelector
                techSelection={techSelection}
                handleTechSelection={handleTechSelection}
                techLayout={TECH_LAYOUT.HORIZONTAL}
              />
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
              <GameVersions
                selectedVideogameVersion={selectedVideogameVersion}
                videogameCode={techSelection.selectedVideogame?.code}
                handleGameVersionSelection={handleGameVersionSelection}
              />
              <Form.Group className="mb-3" controlId="characterSelect">

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
              clipTech={techSelection}
              userName={user.displayName}
              userPhotoURL={user.photoURL}
              userTwitterURL={user.reloadUserInfo?.screenName || ''}
              selectedVideogameVersion={selectedVideogameVersion || ''}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}
