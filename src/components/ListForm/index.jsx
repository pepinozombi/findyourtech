// Nuevo componente para el formulario de lista
import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const ListForm = ({ showModal, handleClose, handleSubmit, formTitle }) => {
  const [listName, setListName] = useState('');

  const handleInputChange = (event) => {
    setListName(event.target.value);
  };

  const handleFormSubmit = () => {
    handleSubmit(listName);
    setListName("");
    handleClose();
  };

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{formTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formListName">
            <Form.Label>List Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter list name"
              value={listName}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleFormSubmit}>
          Save List
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ListForm;