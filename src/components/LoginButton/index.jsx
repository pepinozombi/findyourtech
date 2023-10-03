import React, { useState } from 'react';
import { authenticate, getToken } from 'twitch-auth';

function TwitchLoginButton() {
  const [token, setToken] = useState('');

  const handleLoginClick = async () => {
    const { access_token } = await authenticate({
      client_id: '2751kddfnql4let2bjgrlhx6xkwfvc',
      redirect_uri: 'http://localhost:3000/oauth',
      scope: 'user:read:email',
    });
    setToken(access_token);
  };

  const handleGetUserData = async () => {
    const userData = await fetch('https://api.twitch.tv/helix/users', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Client-Id': '2751kddfnql4let2bjgrlhx6xkwfvc',
      },
    }).then((res) => res.json());
    console.log(userData);
  };

  return (
    <>
      <button onClick={handleLoginClick}>Iniciar sesión con Twitch</button>
      {token && (
        <button onClick={handleGetUserData}>
          Obtener datos de usuario de Twitch
        </button>
      )}
    </>
  );
}