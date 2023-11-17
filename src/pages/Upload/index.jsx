import React, { useEffect, useState, useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ClipItemCard from "../../components/ClipItemCard";
import ClipUpload from "../../components/ClipUpload";
import { AuthenticationContext } from "../../App";

const Upload = () => {
  const [filterSelection, setFilterSelection] = React.useState([]);
  
  const handleFilterSelection = (selectedClipType,selectedVideogame,selectedCharacters,searchText) => {
    }

  return (
    <Container className="mt-4 mb-4">
      <Row>
      { <ClipUpload
          filterSelection={filterSelection}
          handleFilterSelection={handleFilterSelection}
        /> }
      </Row>
    </Container>
  );
};

export default Upload;
