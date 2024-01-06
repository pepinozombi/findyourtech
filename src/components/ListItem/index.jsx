import React, { useEffect, useState } from "react";
import { Card, Image, Stack } from "react-bootstrap";
import obtenerTiempoTranscurrido from "../../functions/obtenerTiempoTranscurrido";
import truncate from "../../functions/truncate";
import { Clock } from "react-bootstrap-icons";
import getUserByUniqueName from "../../functions/getUserByUniqueName";
import ClipPlayer from "../ClipPlayer";
import ClipItemCardCharacters from "../ClipItemCardCharacters";
import { Link } from "react-router-dom";
import shortid from "shortid";

const ListItem = ({
  listId,
  listTitle,
  listDescription,
  listTech,
  createdAt,
  user
}) => {
  const [userProps, setUserProps] = useState(null);

  const fecha = createdAt && obtenerTiempoTranscurrido(new Date(createdAt.seconds * 1000 + Math.round(createdAt.nanoseconds / 1000000)));
  
  useEffect(() => {
    if (user) {
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
      <Card.Body>
        { listId ? (
          <Link to={`/list/${listId}`} >
            <Card.Title>
              {truncate(listTitle || "", 50)}
            </Card.Title>
          </Link>
        ):(
          <Card.Title>
            {truncate(listTitle || "", 50)}
          </Card.Title>
        )}
        
        <Card.Text className="list-desc">
          {
            truncate(listDescription || "", 50)
          }
        </Card.Text>
        {createdAt &&
        <Card.Text>
          <Clock /> {fecha}
        </Card.Text>
        }
          <Stack direction="horizontal" className="flex-container">
        {
          listTech?.selectedListType && (
            <div className="p-1 bd-highlight">
              <span className="selected-item px-1"> 
                  {listTech.selectedListType}
              </span>
            </div>
          )
        }
        {
          listTech?.selectedListLevel && (
            <div className="p-1 bd-highlight">
              <span className="selected-item px-1"> 
                  {listTech.selectedListLevel}
              </span>
            </div>
          )
        }
        </Stack>
      </Card.Body>
        {listTech?.characterSelect && Object.keys(listTech?.characterSelect).length !== 0 && (
          <ClipItemCardCharacters
            characterSelect={listTech?.characterSelect}
            charactersByTeam={listTech?.selectedVideogame.charactersByTeam}
            key={shortid.generate()}
            tooltipkey={shortid.generate()}
          />
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

export default ListItem;
