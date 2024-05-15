import React, { useState, useEffect } from 'react';
import NavbarBlack from '../header/NavbarBlack';
import NavbarWhite from '../header/NavbarWhite';
import Footer from '../footer/Footer';
import { Outlet, useNavigate } from 'react-router-dom';
import NavbarBlackLogged from '../header/NavbarBlackLogged';
import { getUser, getToken, removeSession, validToken } from '../utilities/Common';
import { homePageRoute } from './AppUrls';

const Layout = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        removeSession();
        setIsLoggedIn(false);
        navigate(homePageRoute + 'new-arrivals')
    };

    useEffect(() => {
        const checkAuthStatus = () => {
            const user = getUser();
            const token = getToken();
            if (!user || !token || !validToken()) {
                handleLogout();
                return;
            }
            setIsLoggedIn(true);
        };

        checkAuthStatus();

        const handleStorageChange = (e) => {
            if (e.key === 'user' || e.key === 'token') {
                checkAuthStatus();
            }
        };
        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    return (
        <>
            {isLoggedIn ? <NavbarBlackLogged onLogout={handleLogout} /> : <NavbarBlack />}
            <NavbarWhite />
            <main><Outlet/></main>
            <Footer />
        </>
    );
};
export default Layout;