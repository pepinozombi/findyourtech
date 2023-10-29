import { Card, Image, Stack } from "react-bootstrap";
import ClipItemCardCharacters from "../ClipItemCardCharacters";
import ReactPlayer from "react-player";
import shortid from 'shortid';
import obtenerTiempoTranscurrido from "../../functions/obtenerTiempoTranscurrido";
import truncate from "../../functions/truncate";
import { Clock } from "react-bootstrap-icons";

const ClipItemCard = ({
  clipURL,
  clipTitle,
  clipDescription,
  clipTech,
  userName,
  userPhotoURL,
  userTwitterURL,
  selectedVideogameVersion,
  createdAt
}) => {
  const isTwitchClip = (clipURL) => clipURL.match("twitch");
  const fecha = createdAt && obtenerTiempoTranscurrido(new Date(createdAt.seconds * 1000 + Math.round(createdAt.nanoseconds / 1000000)));

  return (
    <Card style={{ margin: "10px" }}>
      {isTwitchClip(clipURL) ? (
        <iframe
          src={`https://clips.twitch.tv/embed?clip=${
            clipURL.split("/")[3].length > 20
              ? clipURL.split("/")[3]
              : clipURL.split("/")[5].split("?")[0]
          }&parent=findyourtech-2022.web.app&parent=localhost`}
          allowFullScreen
          height="225px"
          width="100%"
          title="twitchClipTech"
        ></iframe>
      ) : (
        <ReactPlayer width={"100%"} height={"225px"} url={clipURL} />
      )}
      <Card.Body style={{ minHeight: "120px" }}>
        <Card.Title>{clipTitle}</Card.Title>
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
        {userName && userPhotoURL && (
          <Card.Link target="_blank" href={"https://twitter.com/" + userTwitterURL}>
            <Image
              src={userPhotoURL}
              alt="UserName profile image"
              roundedCircle
              style={{ width: "30px", marginRight: "10px" }}
            />
            {userName}
          </Card.Link>
        )}
      </Card.Body>
    </Card>
  );
};

export default ClipItemCard;
