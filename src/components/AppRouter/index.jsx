import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from '../../pages/Home';
import Upload from '../../pages/Upload';
import Header from '../Header';
import PrivateRoute from '../PrivateRoute';
import EditUserProfile from '../../pages/EditUserProfile';
import UserProfile from '../../pages/UserProfile';
import NotFound from '../../pages/NotFound';
import Clip from '../../pages/Clip';
import Footer from '../Footer';
import { Box } from "@mui/material";
import List from '../../pages/List';
import Lists from '../../pages/Lists';
import ScrollToTop from '../ScrollToTop';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="App">
        <Box minHeight="100vh" style={{ display: 'flex' }}>
          <div style={{ flexGrow: 1 }}>
          <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/user/:userGet" element={<UserProfile />} />
              <Route path="/clip/:clipGet" element={<Clip />} />
              <Route path="/list/:listGet" element={<List />} />
              <Route path="/lists" element={<Lists />} />
              <Route path="*" element={<NotFound />} />
              <Route element={<PrivateRoute />}>
                <Route path="/upload" element={<Upload />} />
                <Route path="/editUserProfile" element={<EditUserProfile />} />
              </Route>
            </Routes>
          </div>
        </Box>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default AppRouter;
