import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../AuthContext';

export const PrivateRoute = ({ children }) => {
    const { currentUser, loading } = useAuth(); 
    const location = useLocation();


    if (loading) {
        return <div>Cargando...</div>; 
    }

    if (!currentUser) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }


    return children;
};
