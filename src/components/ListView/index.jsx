import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import ClipItemCard from "../../components/ClipItemCard";
import { GridLoader } from "react-spinners";
import getListClipsByListId from "../../functions/getListClipsByListId";
import getClipsByIds from "../../functions/getClipsByIds";

export default function ListView({
  listGet,
  user }) {

  const videogameCode = process.env.REACT_APP_VIDEOGAME_CODE;

  const [clips, setClips] = React.useState([]);
  const [clipIds, setClipIds] = React.useState([]);

  useEffect(() => {
    if(listGet) {
      getListClipsByListId(listGet)
      .then((lists) => {
          console.log(lists);
          setClipIds(lists.data);
      })
      .catch((error) => {
        console.error("Error al cargar los clips de la lista:", error);
      });
    }
  }, [listGet]);

  useEffect(() => {
    getClipsByIds(clipIds)
    .then((list) => {
      console.log(list);
      if(list.status == 200) {
        setClips(list.data);
      }
    })
    .catch((error) => {
      console.error("Error al cargar clips de la lista:", error);
    });
  }, [clipIds]);
  

  return (
    <Col md={8} sm={12}>
      <Row>
        {clips ? (
          clips.map((clip, i) => (
            <Col md={6} key={i}>
              <ClipItemCard
                clipId={clip.id}
                clipURL={clip.url}
                clipTitle={clip.title}
                clipDescription={clip.description}
                clipTech={clip.tech}
                selectedVideogameVersion={clip.indexes.selectedVideogameVersion}
                createdAt={clip.createdAt}
                user={clip.user}
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
    </Col>
  );
}
