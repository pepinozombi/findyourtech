import React, { useEffect, useState } from "react";
import { Card, Image, Stack } from "react-bootstrap";
import ClipItemCardCharacters from "../ClipItemCardCharacters";
import shortid from 'shortid';
import obtenerTiempoTranscurrido from "../../functions/obtenerTiempoTranscurrido";
import truncate from "../../functions/truncate";
import { Clock } from "react-bootstrap-icons";
import getUserByUniqueName from "../../functions/getUserByUniqueName";
import ClipPlayer from "../ClipPlayer";
import { Link } from "react-router-dom";

const ClipItemCard = ({
  clipId,
  clipURL,
  clipTitle,
  clipDescription,
  clipTech,
  selectedVideogameVersion,
  createdAt,
  user
}) => {
  const [userProps, setUserProps] = useState(null);

  const fecha = createdAt && obtenerTiempoTranscurrido(new Date(createdAt.seconds * 1000 + Math.round(createdAt.nanoseconds / 1000000)));
  
  useEffect(() => {
    // Comprobar si el usuario está autenticado
    if (user) {
        // Realizar la consulta a Firebase para obtener UserProps
        // Sustituye 'tuConsultaAFirebase' con la consulta real a tu colección UserProps
        console.log(user);
        getUserByUniqueName(user)
          .then((userPropsData) => {
              setUserProps(userPropsData.data);
        })
        .catch((error) => {
            console.error("Error al cargar UserProps:", error);
        });
    }
  }, [user]);

  return (
    <Card style={{ margin: "10px" }}>
      <ClipPlayer url={clipURL} />
      <Card.Body style={{ minHeight: "120px" }}>
        { clipId ? (
          <Link to={`/clip/${clipId}`} >
            <Card.Title>
              {truncate(clipTitle, 50)}
            </Card.Title>
          </Link>
        ):(
          <Card.Title>
            {truncate(clipTitle, 50)}
          </Card.Title>
        )}
        
        <Card.Text>
          {
            truncate(clipDescription, 100)
          }
        </Card.Text>
        {createdAt &&
        <Card.Text>
          <Clock /> {fecha}
        </Card.Text>
        }
          <Stack direction="horizontal" className="flex-container">
        {
          clipTech.selectedClipType !== "" ? (
            <div className="p-1 bd-highlight">
              <span className="selected-item px-1"> 
                  {clipTech.selectedClipType}
              </span>
            </div>
          ): (
            <>
            </>
          )
        }
        {
          clipTech.selectedClipLevel !== "" ? (
            <div className="p-1 bd-highlight">
              <span className="selected-item px-1"> 
                  {clipTech.selectedClipLevel}
              </span>
            </div>
          ): (
            <></>
          )
        }
        {
          selectedVideogameVersion !== "" ? (
            <div className="p-1 bd-highlight">
              <span className="selected-item px-1"> 
                  v. {selectedVideogameVersion}
              </span>
            </div>
          ): (
            <></>
          )
        }
        </Stack>
      </Card.Body>
        {clipTech?.characterSelect && Object.keys(clipTech?.characterSelect).length !== 0 ? (
          <ClipItemCardCharacters
            characterSelect={clipTech?.characterSelect}
            charactersByTeam={clipTech?.selectedVideogame.charactersByTeam}
            key={shortid.generate()}
            tooltipkey={shortid.generate()}
          />
          ) : (
          <>
          </>
        )}
      <Card.Body>
        {userProps?.uniqueName && (
          <Card.Link target="_blank" href={"/user/" + userProps?.uniqueName}>
            <Image
              src={userProps?.profilePic}
              alt="UserName profile image"
              roundedCircle
              style={{ width: "30px", marginRight: "10px" }}
            />
            {userProps?.name}
          </Card.Link>
        )}
      </Card.Body>
    </Card>
  );
};

export default ClipItemCard;
