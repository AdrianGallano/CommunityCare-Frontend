import React from 'react';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import Loading from '../loading/Loading';
import { Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const { isAuthenticated, isLoading } = useContext(AuthContext)
    
    if (isLoading) {
        return <Loading />
    }

    return isAuthenticated ? <Outlet/> : <Navigate to="/401" />;
};

export default ProtectedRoute;
