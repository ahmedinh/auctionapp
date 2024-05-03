import React from 'react';
import NavbarBlack from '../header/NavbarBlack';
import NavbarWhite from '../header/NavbarWhite';
import Footer from '../footer/Footer';
import NavbarBlackLogged from '../header/NavbarBlackLogged';
import { useState, useEffect } from 'react';

const ProtectedLayout = (props) => {
    const { children } = props;
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const user = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!user && !!token);
    }, []);
    return (
        <>
            {isLoggedIn ? <NavbarBlackLogged /> : <NavbarBlack />}
            <NavbarWhite />
            {children}
            <Footer />
        </>
    );
};
export default ProtectedLayout;