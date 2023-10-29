import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ClipItemCard from "../../components/ClipItemCard";
import ClipsFilter from "../../components/ClipsFIlter";
import getAllClips from "../../functions/getAllClips";
import { GridLoader } from "react-spinners";

const Home = () => {
  const [clips, setClips] = React.useState([]);
  const [filterSelection, setFilterSelection] = React.useState([]);
  const [techSelectionHome, setTechSelectionHome] = React.useState([]);
  const [searchTextHome, setSearchTextHome] = React.useState("");
  var timeOut;

  const handleFilterSelection = (techSelection, searchText) => {
    console.log('actualizando...');
    setClips(null);
    // Cancela el temporizador
    clearTimeout(timeOut);
     //console.log(techSelection);
    // console.log(searchText);
    // Actualiza el estado y utiliza la función de retorno
    setTechSelectionHome(techSelection)
    setSearchTextHome(searchText)

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
        {clips ? (
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
                selectedVideogameVersion={clip.indexes.selectedVideogameVersion}
                createdAt={clip.createdAt}
              />
            </Col>
          ))
        ) : (
          // Muestra el spinner o cualquier otro indicador de carga
          <GridLoader
            color="#250043"
          />
        )}
      </Row>
    </Container>
  );
};

export default Home;
