import React from 'react'
import { Form } from "react-bootstrap";

const SelectedClipType = ({
    clipType,
    handleClipTypeSelection
}) => {
  return (
    <Form.Group className="m-2" controlId="selectVideogame">
          <Form.Select aria-label="Select videogame" value={clipType} onChange={handleClipTypeSelection} >
            <option value="">Clip type...</option>
            <option value="combo">Combo</option>
            <option value="tech">Tech</option>
            <option value="mixup">Mixup</option>
            <option value="match">Match</option>
            <option value="random">Random</option>
          </Form.Select>
        </Form.Group>
  )
}

export default SelectedClipType;
