import React from 'react';
import NavbarBlack from '../header/NavbarBlack';
import Footer from '../footer/Footer';
import { Outlet } from 'react-router-dom';
import NavbarWhiteAuth from '../header/NavbarWhiteAuth';

const AuthLayout = () => {
    return (
        <>
            <NavbarBlack />
            <NavbarWhiteAuth />
            <main><Outlet /></main>
            <Footer />
        </>
    );
};
export default AuthLayout;