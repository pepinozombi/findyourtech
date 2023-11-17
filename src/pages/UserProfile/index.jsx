import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import { Tab, Tabs, Spinner } from 'react-bootstrap';
import ChannelCard from "../../components/ChannelCard";
import getUserByName from "../../functions/getUserByName";

const UserProfile = () => {
  const [videos, setVideos] = useState(null);
  const [activeTab, setActiveTab] = useState('home');
  const [isLoading, setIsLoading] = useState(false);
  const [tabContent, setTabContent] = useState({});
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
  }, [userGet])

  const handleTabChange = (tab) => {
    setIsLoading(true);

    // Realiza una consulta a Firebase aquí
    // Reemplaza esto con tu lógica de consulta de Firebase
    // Por ejemplo, consulta datos de Firebase y actualiza el estado de `tabContent`

    // Simulación de consulta de Firebase con un retraso
    setActiveTab(tab);

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Box minHeight="95vh">
      <Box>
        <div style={{
          height:'200px',
          background: 'linear-gradient(90deg, #4b6cb7 0%,  #182848 100%)',
          zIndex: 0,
        }} />
        <ChannelCard userProps={userProps} marginTop="-150px" />
      </Box>
      <div className="d-flex justify-content-center align-items-center h-100 mb-5">
        <Tabs activeKey={activeTab} onSelect={handleTabChange} className="d-flex justify-content-center align-items-center h-100" variant="pills">
          <Tab eventKey="home" title="Home" />
          <Tab eventKey="clips" title="Clips" />
          <Tab eventKey="playlists" title="Playlists" />
          <Tab eventKey="guides" title="Guides" />
          <Tab eventKey="results" title="Results" />
        </Tabs>
      </div>
      {isLoading ? (
        <div className="container">
          <Spinner animation="border" role="status">
          </Spinner>
        </div>
      ) : (
        <div className="container">
          {tabContent[activeTab]}
          {activeTab}
        </div>
      )}
    </Box>
  );
};

export default UserProfile;
