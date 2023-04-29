import React, { useState, useEffect } from "react";
import { Form, Stack, Col, Row } from "react-bootstrap";
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
    console.log(e.target.value)
    setSearchText(e.target.value)
  }

  const handleTechSelection = (selectedClipType, selectedVideogame, selectedCharacters) => {
    console.log(selectedClipType)
    console.log(selectedVideogame)
    console.log(selectedCharacters)
  }

  return (
    <Form>
      <Row>
        <Col xs={5}>
          <TechSelector
            techSelection={techSelection}
            handleTechSelection={handleTechSelection}
            techLayout={TECH_LAYOUT.HORIZONTAL}
          />
        </Col>
        <Col xs={7}>
          <Form.Group controlId="search" className="w-100 m-2">
            <Form.Control type="text" placeholder="Search..." onChange={e => setSearchText(e.target.value)} />
          </Form.Group>
        </Col>
      </Row>
    </Form>

  );
};

export default ClipsFilter;
