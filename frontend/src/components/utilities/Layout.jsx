import React from 'react';
import NavbarBlack from '../header/NavbarBlack';
import NavbarWhite from '../header/NavbarWhite';
import Footer from '../footer/Footer';
import { Outlet } from 'react-router-dom';
import NavbarBlackLogged from '../header/NavbarBlackLogged';
import { useState, useEffect } from 'react';

const Layout = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const user = sessionStorage.getItem('user');
        const token = sessionStorage.getItem('token');
        setIsLoggedIn(!!user && !!token);
    }, []);
    return (
        <>
            {isLoggedIn ? <NavbarBlackLogged /> : <NavbarBlack />}
            <NavbarWhite />
            <main><Outlet/></main>
            <Footer />
        </>
    );
};
export default Layout;