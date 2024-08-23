import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { LogInContext } from '../../context/LogInContextProvider';

const ProtectedRoute = () => {
    const { isAuth } = useContext(LogInContext);

    return isAuth ? (
        <Outlet />
    ) : (
        <Navigate to="/log-in" replace state={{ protectedRoute: true }} /> // Redirect to login page
    );
};

export default ProtectedRoute;
