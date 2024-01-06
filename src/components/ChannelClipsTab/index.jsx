import React, {useEffect, useState} from 'react'
import getAllClipsByUser from '../../functions/getAllClipsByUser';
import ClipItemCard from "../../components/ClipItemCard";
import { GridLoader } from "react-spinners";

import { Container, Row, Col } from "react-bootstrap";

const ChannelClipsTab = ({
  userGet
}) => {
  const videogameCode = process.env.REACT_APP_VIDEOGAME_CODE;

  const [clips, setClips] = React.useState([]);

  useEffect(() => {
    getAllClipsByUser(videogameCode, userGet)
    .then((clips) => {setClips(clips);})
    .catch((error) => {
      console.error("Error al cargar clips del usuario:", error);
    });
  }, [userGet]);

  return (
    <Container className="mt-4 mb-4">
      <Row>
        {clips ? (
          clips.map((clip, i) => (
            <Col md={4} key={i}>
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
    </Container>
  )
}

export default ChannelClipsTab;
