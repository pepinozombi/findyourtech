import React from 'react'
import { Form } from "react-bootstrap";

const SelectedListType = ({
    listType,
    handleListTypeSelection
}) => {
  return (
    <Form.Group controlId="selectClipType" style={{maxWidth: '175px'}}>
      <Form.Select aria-label="Select List Type" value={listType} onChange={handleListTypeSelection}  >
        <option value="">All types</option>
        <option value="character-overall">Character overall</option>
        <option value="team-overall">Team overall</option>
        <option value="combos">Combos</option>
        <option value="defensive-tech">Defensive tech</option>
        <option value="matches">Matches</option>
        <option value="mixups">Mixups</option>
        <option value="strings">Strings</option>
        <option value="team-composition">Team composition</option>
        <option value="training-routine">Training routine</option>
        <option value="random">Random</option>
      </Form.Select>
    </Form.Group>
  )
}

export default SelectedListType;
