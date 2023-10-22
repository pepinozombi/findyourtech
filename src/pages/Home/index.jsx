import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ClipItemCard from "../../components/ClipItemCard";
import ClipsFilter from "../../components/ClipsFIlter";
import getAllClips from "../../functions/getAllClips";

const Home = () => {
  const [clips, setClips] = React.useState([]);
  const [filterSelection, setFilterSelection] = React.useState([]);
  const [techSelection, setTechSelection] = React.useState([]);
  const [searchText, setSearchText] = React.useState("");
  var timeOut;

  const handleFilterSelection = (techSelection, searchText) => {
    // Cancela el temporizador
    clearTimeout(timeOut);
  
    // Actualiza el estado y utiliza la función de retorno
    setTechSelection(techSelection)
    setSearchText(searchText)

    timeOut = setTimeout(function () {
      getAllClips(
        techSelection,
        searchText
      ).then((clips) => {setClips(clips);});
    }, 1000);
  };

  function updateClips() {
    
  }

  useEffect(() => updateClips(), []);

  return (
    <Container className="mt-4 mb-4">
      <Row>
      { <ClipsFilter
          filterSelection={filterSelection}
          handleFilterSelection={handleFilterSelection}
        /> }
      </Row>
      <Row>
        {clips &&
          clips.map((clip, i) => (
            <Col md={4} key={i}>
              <ClipItemCard
                clipURL={clip.url}
                clipTitle={clip.title}
                clipDescription={clip.description}
                clipTech={clip.tech}
                userName={clip.user.name}
                userPhotoURL={clip.user.photoURL}
                userTwitterURL={clip.user.twitter}
                selectedVideogameVersion={clip.selectedVideogameVersion}
              />
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default Home;
