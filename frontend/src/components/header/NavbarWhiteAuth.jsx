import React from 'react';
import './NavbarWhiteAuth.scss'
import Logo from '../../assets/logo.png';

export default function NavbarWhiteAuth() {
    return (
        <div className="white-bar">
            <div className="logo-space">
                <img src={Logo} alt="Logo.png" />
            </div>
            <hr />
        </div>
    );
};