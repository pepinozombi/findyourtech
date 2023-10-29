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
    handleFilterSelection(techSelection, searchText)
  }, [techSelection, searchText]);


  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value)
    //handleFilterSelection(techSelection, e.target.value)
  }

  const handleTechSelection = (selectedClipType, selectedClipLevel, selectedVideogame, selectedCharacters) => {
    let newTechSelection = {selectedClipType, selectedClipLevel, selectedVideogame, selectedCharacters}
    setTechSelection({selectedClipType, selectedClipLevel, selectedVideogame, selectedCharacters})
    //handleFilterSelection(newTechSelection, searchText)
  }

  return (
    <Form>
      <Row className="justify-content-center">
        <Col xs={12} md={12} lg={12} className="mb-2">
          <TechSelector
            techSelection={techSelection}
            handleTechSelection={handleTechSelection}
            techLayout={TECH_LAYOUT.HORIZONTAL}
          />
        </Col>
        <Col xs={12} md={12} lg={6} className="mb-2">
          <Form.Group controlId="search" className="w-100 ms-1 input-group">
            <Form.Control 
              className="search-bar form-control border-end-0" 
              type="search" 
              placeholder="BnB, Optimal, Saucy, Midscreen, Corner..." 
              onChange={e => handleSearchTextChange(e)} 
            />
          </Form.Group>
        </Col>
      </Row>
    </Form>

  );
};

export default ClipsFilter;
