import React, {useContext} from 'react';
import { Outlet, Navigate } from "react-router-dom";
import { AuthenticationContext } from "../../App";

const PrivateRoute = () => {
    const { user } = useContext(AuthenticationContext);
    return (
      user ? <Outlet /> : <Navigate to="/" />
    );
  };

export default PrivateRoute;