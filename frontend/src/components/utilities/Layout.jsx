import React from 'react';
import NavbarBlack from '../header/NavbarBlack';
import NavbarWhite from '../header/NavbarWhite';
import Footer from '../footer/Footer';

const Layout = ({ children }) => {
    return (
        <>
            <NavbarBlack />
            <NavbarWhite />
            <main>{children}</main>
            <Footer />
        </>
    );
};
export default Layout;