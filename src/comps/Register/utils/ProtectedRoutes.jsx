import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import fakeAuth from './fakeAuth';

const ProtectedRoute = () => (
    fakeAuth.isAuthenticated ? ( // DO THISSSSSSSSSSSSSSSSSSSSSSSSSSS
        <Outlet />
    ) : (
        <Navigate to="/login" replace state={{ protectedRoute: true }} /> // Redirect to login page
    )
);

export default ProtectedRoute;