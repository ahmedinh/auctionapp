import React, { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { isUserAuthorized, validToken } from "./Common";
import Layout from "./Layout";

const ProtectedRoute = () => {
    const navigate = useNavigate();
    const isAuthenticated = isUserAuthorized() && validToken();

    useEffect(() => {
        if (!isAuthenticated) {
            return navigate('/login', { replace: true });
        }
    }, [isAuthenticated, navigate]);

    return (
        <Layout >
            <Outlet />
        </Layout>
    );
};
export default ProtectedRoute;