import { Card, Image, ListGroup, ListGroupItem, Stack } from "react-bootstrap";
import ReactPlayer from "react-player";

const ClipItemCard = ({
  clipURL,
  clipTitle,
  clipDescription,
  clipTech,
  userName,
  userPhotoURL,
  userTwitterURL,
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
          <Stack direction="horizontal">
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
        </Stack>
      </Card.Body>
      <ListGroup className="list-group-flush">
        {clipTech.selectedVideogame !== undefined ? (clipTech.selectedVideogame.map((videogame, i) => (
          <ListGroupItem className="characters-selected" key={i}>
            <div className="character">
              <img src={videogame.image} alt={videogame.name} />
              <span>{videogame.name}</span>
            </div>
          </ListGroupItem>
        ))) : (
          <>
          </>
        )}
      </ListGroup>
      <ListGroup className="list-group-flush" horizontal>
        {clipTech.selectedCharacters !== undefined ? (clipTech.selectedCharacters.map((character, i) => (
          <ListGroupItem className="characters-selected" key={i}>
            <div className="character">
              <img src={character.image} alt={character.name} />
              <span>{character.name}</span>
            </div>
          </ListGroupItem>
        ))) : (
          <>
          </>
        )}
      </ListGroup>
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
