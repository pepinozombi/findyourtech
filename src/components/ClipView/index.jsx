import React, { useState, useEffect } from "react";
import { Stack, CardLink, Image } from "react-bootstrap";
import { toast } from 'react-toastify';
import getClipById from "../../functions/getClipById";
import ClipPlayer from "../ClipPlayer";
import { Clock } from "react-bootstrap-icons";
import obtenerTiempoTranscurrido from "../../functions/obtenerTiempoTranscurrido";
import getUserByUniqueName from "../../functions/getUserByUniqueName";
import ClipItemCardCharacters from "../ClipItemCardCharacters";
import shortid from "shortid";
import CommentSection from "../CommentSection";

const ClipView = (
  clipIdFromPage
) => {

  const [clipId, setClipId] = useState(null)
  const [clip, setClip] = useState(null)
  const [clipUrl, setClipUrl] = useState(null)
  const [loading, setLoading] = useState(true)
  const [width, setWidth] = useState(window.innerWidth * 0.8);
  const [userProps, setUserProps] = useState(null);
  const aspectRatio = 16 / 9; // Relación de aspecto 16:9

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth * 0.8);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    setClipId(clipIdFromPage.clipIdFromPage)
  }, [clipIdFromPage])

  useEffect(() => {
    //getClipById(clipId)
    if (clipId) {
      // Realizar la consulta a Firebase para obtener UserProps
      getClipById(clipId)
        .then((clipReturn) => {
          setClip(clipReturn.data);
          console.log(clipReturn);
          setLoading(false); // Cambia el estado de carga una vez que los datos están listos
        })
        .catch((error) => {
          toast.error("Error al cargar UserProps:", error);
          setLoading(false);
        });
    } else {
      setLoading(false); // Si el usuario no está autenticado, cambiar el estado de carga
    }
  }, [clipId])

  useEffect(() => {
    console.log(clip)

    // Comprobar si el usuario está autenticado
    if (clip?.user) {
      // Realizar la consulta a Firebase para obtener UserProps
      // Sustituye 'tuConsultaAFirebase' con la consulta real a tu colección UserProps
      console.log(clip?.user);
      getUserByUniqueName(clip?.user)
        .then((userPropsData) => {
          setUserProps(userPropsData.data);
        })
        .catch((error) => {
          console.error("Error al cargar UserProps:", error);
        });
    }
    //aqui cargar los related y los comentarios más tarde, una vez crgado el video
  }, [clip])



  const calculateHeight = () => {
    return `${Math.floor(width / aspectRatio)}px`;
  };

  return (
    <>
      <div className="container-fluid">
        <div
          className="row justify-content-center"
          style={{ backgroundColor: "black" }}
        >
          <div className="col-12 col-lg-9">
            <div
              className="embed-responsive embed-responsive-16by9 mt-2 mb-2"
              style={{ width: '100%', height: calculateHeight() }} // 16 / 9 = 56.25
            >
              {clip?.url &&
                <ClipPlayer
                  url={clip.url}
                  clipHeight={calculateHeight()}
                />}
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-9">
            <div className="row">
              <div className="col-12">
                <div className="row">
                  <div className="col-12">
                    <h2>
                      {clip?.title}
                    </h2>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    {userProps?.uniqueName && (
                      <CardLink target="_blank" href={"/user/" + userProps?.uniqueName}>
                        <Image
                          src={userProps?.profilePic}
                          alt="UserName profile image"
                          roundedCircle
                          style={{ width: "30px", marginRight: "10px" }}
                        />
                        {userProps?.name}
                      </CardLink>
                    )}
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <Clock />
                    {
                      clip?.createdAt &&
                      obtenerTiempoTranscurrido(new Date(clip?.createdAt?.seconds * 1000 + Math.round(clip?.createdAt?.nanoseconds / 1000000)))
                    }
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <p>
                      {clip?.description}
                    </p>
                  </div>
                </div>

              </div>
            </div>
            <Stack direction="horizontal" className="flex-container">
              {
                clip?.tech?.selectedClipType !== "" ? (
                  <div className="p-1 bd-highlight">
                    <span className="selected-item px-1">
                      {clip?.tech?.selectedClipType}
                    </span>
                  </div>
                ) : (
                  <>
                  </>
                )
              }
              {
                clip?.tech?.selectedClipLevel !== "" ? (
                  <div className="p-1 bd-highlight">
                    <span className="selected-item px-1">
                      {clip?.tech?.selectedClipLevel}
                    </span>
                  </div>
                ) : (
                  <></>
                )
              }
              {
                clip?.indexes?.selectedVideogameVersion !== "" ? (
                  <div className="p-1 bd-highlight">
                    <span className="selected-item px-1">
                      v. {clip?.indexes?.selectedVideogameVersion}
                    </span>
                  </div>
                ) : (
                  <></>
                )
              }
            </Stack>
            {clip?.tech?.characterSelect && Object.keys(clip.tech?.characterSelect).length !== 0 ? (
              <ClipItemCardCharacters
                characterSelect={clip?.tech?.characterSelect}
                charactersByTeam={clip?.tech?.selectedVideogame.charactersByTeam}
                key={shortid.generate()}
                tooltipkey={shortid.generate()}
              />
            ) : (
              <>
              </>
            )}
            <div className="row">
              <div className="col-12">
                <CommentSection
                  clipId={clipIdFromPage ? clipIdFromPage : null}
                />
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-3">
            <div className="container">
              <div className="row">
                related
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default ClipView;