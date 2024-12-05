import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ isLoggedIn, isAdmin, children }) => {
    if (!isLoggedIn) {
        return <Navigate to="/inicioSesion" />;
    }
    if (!isAdmin) {
        return <Navigate to="/" />;
    }
    return children;
};

export default PrivateRoute;
