import React, { useContext } from 'react';
import { BrowserRouter, Route, Routes, Switch, Navigate, Outlet } from 'react-router-dom';

import Home from '../../pages/Home'; // Ruta pública
import Upload from '../../pages/Upload'; // Ruta pública
import Header from '../Header'; // Ruta pública
import PrivateRoute from '../PrivateRoute';
import EditUserProfile from '../../pages/EditUserProfile';
import UserProfile from '../../pages/UserProfile';
import NotFound from '../../pages/NotFound';
import Clip from '../../pages/Clip';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user/:userGet" element={<UserProfile />} />
          <Route path="/clip/:clipGet" element={<Clip />} />
          <Route path="*" element={<NotFound />} />
          <Route element={<PrivateRoute />}>
            <Route path="/upload" element={<Upload />} />
            <Route path="/editUserProfile" element={<EditUserProfile />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default AppRouter;
