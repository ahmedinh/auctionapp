import React, { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { isUserAuthorized, validToken } from "./Common";
import ProtectedLayout from "./ProtectedLayout";

const ProtectedRoute = () => {
    const navigate = useNavigate();
    const isAuthenticated = isUserAuthorized() && validToken();

    useEffect(() => {
        if (!isAuthenticated) {
            return navigate('/login', { replace: true });
        }
    }, [isAuthenticated, navigate]);

    return (
        <ProtectedLayout >
            <Outlet />
        </ProtectedLayout>
    );
};
export default ProtectedRoute;