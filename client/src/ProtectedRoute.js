import React from 'react';
import { Route, Navigate } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ isAuthenticated, ...props }) => {
  return isAuthenticated === true ? 
    <Route {...props} />
   : 
    <Navigate to="/login" />;
};

export default ProtectedRoute;