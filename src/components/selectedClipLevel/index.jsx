import React from 'react'
import { Form } from "react-bootstrap";

const SelectedClipLevel = ({
    clipLevel,
    handleClipLevelSelection
}) => {
  return (
    <Form.Group controlId="selectClipLevel" style={{maxWidth: '175px'}}>
          <Form.Select aria-label="Select clip level" value={clipLevel} onChange={handleClipLevelSelection}>
            <option value="">All levels</option>
            <option value="basic">Basic</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
            <option value="pro">Pro</option>
          </Form.Select>
        </Form.Group>
  )
}

export default SelectedClipLevel;
