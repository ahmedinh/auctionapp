import React from 'react';
import NavbarBlack from '../header/NavbarBlack';
import NavbarWhite from '../header/NavbarWhite';
import Footer from '../footer/Footer';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <>
            <NavbarBlack />
            <NavbarWhite />
            <main><Outlet /></main>
            <Footer />
        </>
    );
};
export default Layout;