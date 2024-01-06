import React, {useEffect, useState} from 'react'
import getAllListsByUser from '../../functions/getAllListsByUser';
import ClipItemCard from "../../components/ClipItemCard";
import { GridLoader } from "react-spinners";

import { Container, Row, Col } from "react-bootstrap";
import ListItem from '../ListItem';

const ChannelListsTab = ({
  userGet
}) => {
  const videogameCode = process.env.REACT_APP_VIDEOGAME_CODE;

  const [lists, setLists] = React.useState([]);

  useEffect(() => {
    getAllListsByUser(userGet)
    .then((lists) => {console.log(lists);setLists(lists);})
    .catch((error) => {
      console.error("Error al cargar lists del usuario:", error);
    });
  }, [userGet]);

  return (
    <Container className="mt-4 mb-4">
      <Row>
        {lists ? (
          lists.map((list, i) => (
            <Col md={12} key={i}>
              <ListItem
                listId={list.id}
                listTitle={list.name}
                listTech={list.tech}
                listDescription={list.description}
                createdAt={list.createdAt}
                user={list.user}
              />
            </Col>
          ))
        ) : (
          // Muestra el spinner o cualquier otro indicador de carga
          <GridLoader
            color="#250043"
          />
        )}
      </Row>
    </Container>
  )
}

export default ChannelListsTab;
