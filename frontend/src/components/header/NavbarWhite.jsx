import React from "react";
import { useLocation } from "react-router-dom";
import "./NavbarWhite.scss";
import Logo from "../icons/logo.png";
import Magnifier from "../icons/Magnifier";

const NavbarWhite = () => {
    const location = useLocation(); // Get the current location object
    const currentPath = location.pathname; // Extract the path from location

    // Determine if the current path matches one of the specified routes
    const isSpecialRoute = ['/about-us', '/privacy-and-policy', '/terms-and-conditions'].includes(currentPath);
    
    return (
        <div className="navbar-white">
            <div className="left-container">
                <img src={Logo} alt="Logo" className="logo"/>
            </div>
            <div className="search-container">
                <input type="text" placeholder="Try enter: Shoes" className="search-bar"/>
                <button className="search-icon">
                    <Magnifier/>
                </button>
            </div>
            <div className="buttons">
                <button className={`nav-btn ${isSpecialRoute ? 'special-route' : ''}`}>HOME</button>
                <button className="nav-btn">SHOP</button>
                <button className="nav-btn">MY ACCOUNT</button>
            </div>
        </div>
    );
};

export default NavbarWhite;
