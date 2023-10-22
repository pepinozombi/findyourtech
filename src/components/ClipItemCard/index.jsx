import { Card, Image, Stack } from "react-bootstrap";
import ClipItemCardCharacters from "../ClipItemCardCharacters";
import ReactPlayer from "react-player";
import shortid from 'shortid';

const ClipItemCard = ({
  clipURL,
  clipTitle,
  clipDescription,
  clipTech,
  userName,
  userPhotoURL,
  userTwitterURL,
  selectedVideogameVersion
}) => {
  const isTwitchClip = (clipURL) => clipURL.match("twitch");

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
        <Card.Text>{clipDescription}</Card.Text>
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
      {/* <ListGroup className="list-group-flush">
        {clipTech.selectedVideogame !== undefined ? (
          <ListGroupItem className="characters-selected" key={clipTech.selectedVideogame.name}>
            <div className="character">
              <img src={clipTech.selectedVideogame.image} alt={clipTech.selectedVideogame.name} />
              <span>{clipTech.selectedVideogame.name}</span>
            </div>
          </ListGroupItem>) : (
          <>
          </>
        )}
      </ListGroup> */}
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
