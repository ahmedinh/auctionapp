import React, { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { isUserAuthorized, validToken, removeSession } from "./Common";
import Layout from "./Layout";

const ProtectedRoute = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const authenticated = isUserAuthorized() && validToken();

        if (!authenticated) {
            removeSession();
            navigate('/not-found', { replace: true });
        }
    }, [navigate]);

    // Only render the children if authenticated
    const authenticated = isUserAuthorized() && validToken();
    return authenticated ? (
        <Layout>
            <Outlet />
        </Layout>
    ) : null;
};

export default ProtectedRoute;
