import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Tab, Tabs, Spinner } from 'react-bootstrap';
import ChannelCard from "../../components/ChannelCard";
import getUserByName from "../../functions/getUserByName";
import ChannelClipsTab from "../../components/ChannelClipsTab";
import ChannelListsTab from "../../components/ChannelListsTab";
import { Box } from "@mui/material";

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isLoading, setIsLoading] = useState(false);
  const [userProps, setUserProps] = useState(null);

  const { userGet } = useParams();

  useEffect(() => {
    getUserByName(userGet)
      .then((userPropsData) => {
        setUserProps(userPropsData.data);
        console.log(userPropsData.data);
      })
      .catch((error) => {
        console.error("Error al cargar UserProps:", error);
      });
  }, [userGet]);

  // Componentes correspondientes a cada pestaña
  const tabComponents = {
    home: <div>Contenido de la pestaña Home</div>,
    clips: <ChannelClipsTab userGet={userGet}/>,
    playlists: <ChannelListsTab userGet={userGet}/>,
    guides: <div>Contenido de la pestaña Guides</div>,
    results: <div>Contenido de la pestaña Results</div>,
  };

  const handleTabChange = (tab) => {
    setIsLoading(true);
    // Simula una carga de datos (aquí puedes realizar tu lógica para cargar datos desde Firebase)

    // Simulación de carga de datos con un retraso
    setTimeout(() => {
      setActiveTab(tab);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div>
      <Box>
        <div
          style={{
            height: "200px",
            background:
              "linear-gradient(90deg, #4b6cb7 0%,  #182848 100%)",
            zIndex: 0,
          }}
        />
        <ChannelCard userProps={userProps} marginTop="-150px" />
      </Box>
      <div className="d-flex justify-content-center align-items-center h-100 mb-5">
        <Tabs
          activeKey={activeTab}
          onSelect={handleTabChange}
          className="d-flex justify-content-center align-items-center h-100"
          variant="pills"
        >
          <Tab eventKey="home" title="Home" />
          <Tab eventKey="clips" title="Clips" />
          <Tab eventKey="playlists" title="Playlists" />
          <Tab eventKey="guides" title="Guides" />
          <Tab eventKey="results" title="Results" />
        </Tabs>
      </div>
      {isLoading ? (
        <div className="container">
          <Spinner animation="border" role="status"></Spinner>
        </div>
      ) : (
        <div className="container">
          {tabComponents[activeTab]}
        </div>
      )}
    </div>
  );
};

export default UserProfile;
