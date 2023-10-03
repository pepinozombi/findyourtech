import React, { useState, useEffect } from "react";
import { Form, Col, Row } from "react-bootstrap";
import TechSelector from '../TechSelector'
import { TECH_LAYOUT } from "../../utils/collections/layout";

const ClipsFilter = ({
  filterSelection,
  handleFilterSelection
}) => {
  const [searchText, setSearchText] = useState("");

  const [techSelection, setTechSelection] = React.useState([]);


  useEffect(() => {
    // Runs after EVERY rendering
    //console.log(techSelection, searchText);
    handleFilterSelection(techSelection, searchText)
  }, [techSelection, searchText]);


  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value)
  }

  const handleTechSelection = (selectedClipType, selectedClipLevel, selectedVideogame, selectedCharacters) => {
    setTechSelection({selectedClipType, selectedClipLevel, selectedVideogame, selectedCharacters})
  }

  return (
    <Form>
      <Row>
        <Col xs={12} md={12} lg={6} className="mb-2">
          <TechSelector
            techSelection={techSelection}
            handleTechSelection={handleTechSelection}
            techLayout={TECH_LAYOUT.HORIZONTAL}
          />
        </Col>
        <Col xs={12} md={12} lg={6} className="mb-2">
          <Form.Group controlId="search" className="w-100 ms-1">
            <Form.Control type="text" placeholder="Search..." onChange={e => setSearchText(e.target.value)} />
          </Form.Group>
        </Col>
      </Row>
    </Form>

  );
};

export default ClipsFilter;
