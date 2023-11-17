import React from "react";
import ReactPlayer from "react-player";

const ClipPlayer = ({ url, clipHeight="225px" }) => {

    // Función para determinar el tipo de reproductor según la URL
  const getVideoPlayer = (url) => {
    if (url.includes('twitch.tv')) {
      // Si la URL es de Twitch, usar un iframe
      return (
        <iframe
          src={`https://clips.twitch.tv/embed?clip=${
            url.split("/")[3].length > 20
              ? url.split("/")[3]
              : url.split("/")[5].split("?")[0]
          }&parent=findyourtech-2022.web.app&parent=localhost`}
          allowFullScreen
          width="100%"
          height={clipHeight}
          title="twitchClipTech"
        ></iframe>
      );
    } else if (url.includes('video.twimg')) {
      // Si la URL es de video.twimg, usar la etiqueta video de HTML5
      return <video controls width="100%" height={clipHeight} src={url} />;
    } else {
      // Para cualquier otra URL, usar ReactPlayer
      return <ReactPlayer url={url} controls width="100%" height={clipHeight} />;
    }
  };

  return <div className="video-player-container">{getVideoPlayer(url)}</div>;
};

export default ClipPlayer;