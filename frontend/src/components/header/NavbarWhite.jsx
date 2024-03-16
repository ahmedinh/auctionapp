import React from "react";
import "./NavbarWhite.scss";
import Logo from "../icons/logo.png";
import Magnifier from "../icons/Magnifier";

const NavbarWhite = () => {
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
                <button className="nav-btn">HOME</button>
                <button className="nav-btn">SHOP</button>
                <button className="nav-btn">MY ACCOUNT</button>
            </div>
        </div>
    );
};

export default NavbarWhite;
