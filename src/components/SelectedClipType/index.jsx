import React from 'react'
import { Form } from "react-bootstrap";

const SelectedClipType = ({
    clipType,
    handleClipTypeSelection
}) => {
  return (
    <Form.Group className="w-100 ms-1" controlId="selectClipType">
          <Form.Select aria-label="Select Clip Type" value={clipType} onChange={handleClipTypeSelection} >
            <option value="">All types</option>
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
