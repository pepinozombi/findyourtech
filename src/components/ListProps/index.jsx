import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import getListById from "../../functions/getListById";
import { GridLoader } from "react-spinners";
import ListItem from "../ListItem";

export default function ListProps({
  listGet,
  user }) {

  const videogameCode = process.env.REACT_APP_VIDEOGAME_CODE;

  const [lists, setLists] = React.useState([]);

  useEffect(() => {
    getListById(listGet)
    .then((list) => {console.log(list);setLists([list.data]);})
    .catch((error) => {
      console.error("Error al cargar lists del usuario:", error);
    });
  }, [listGet]);
  

  return (
    <Col md={4} sm={12}>
      {lists ? (
          lists.map((list, i) => (
              <ListItem
                listTitle={list.name}
                listDescription={list.description}
                listTech={list.tech}
                createdAt={list.createdAt}
                user={list.user}
              />
          ))
        ) : (
          // Muestra el spinner o cualquier otro indicador de carga
          <GridLoader
            color="#250043"
          />
        )}
    </Col>
  );
}
