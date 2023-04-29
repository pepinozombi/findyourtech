import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ClipItemCard from "../../components/ClipItemCard";
import ClipsFilter from "../../components/ClipsFIlter";
//import getAllClips from "../../functions/getAllClips";

const Home = () => {
  const [clips, setClips] = React.useState([]);
  const [filterSelection, setFilterSelection] = React.useState([]);

  const handleFilterSelection = (techSelection,searchText) => {
      console.log(techSelection)
      console.log(searchText)
    }

  // function updateClips() {
  //   //getAllClips().then((clips) => setClips(clips));
  // }

  //useEffect(() => updateClips(), []);

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
                charactersSelected={clip.characters}
                userName={clip.user.name}
                userPhotoURL={clip.user.photoURL}
                userTwitterURL={clip.user.twitter}
              />
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default Home;
