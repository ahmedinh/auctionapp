import React from "react";
import "./NavbarWhite.scss";
import Logo from "../icons/logo.png";
import Magnifier from "../icons/Magnifier";

const NavbarWhite = () => {
    return (
        <div className="navbar-white">
            <img src={Logo} alt="Logo" className="logo"/>
            <div className="search-container">
                <input type="text" placeholder="Try enter: Shoes" className="search-bar"/>
                <button className="search-icon">
                    <Magnifier/>
                </button>
            </div>
            <button className="nav-btn">HOME</button>
            <button className="nav-btn">SHOP</button>
            <button className="nav-btn">MY ACCOUNT</button>
        </div>
    );
};

export default NavbarWhite;