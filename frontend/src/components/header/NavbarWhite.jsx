import React from "react";
import { NavLink } from "react-router-dom";
import "./NavbarWhite.scss";
import Logo from "../../assets/logo.png";
import { Icon } from "@iconify/react";

const NavbarWhite = () => {
    return (
        <div className="navbar-white">
            <div className="left-container">
                <img src={Logo} alt="Logo" className="logo" />
            </div>
            <div className="search-container">
                <input type="text" placeholder="Try enter: Shoes" className="search-bar" />
                <button className="search-icon">
                    <Icon icon="mdi-light:magnify" style={{ height: "20px", width: "20px" }} />
                </button>
            </div>
            <div className="buttons">
                <NavLink to="/home" className={({ isActive }) => `nav-btn ${isActive ? 'active' : ''}`}>
                    HOME
                </NavLink>
                <NavLink to="/shop" className={({ isActive }) => `nav-btn ${isActive ? 'active' : ''}`}>
                    SHOP
                </NavLink>
                <NavLink to="/my-account" className={({ isActive }) => `nav-btn ${isActive ? 'active' : ''}`}>
                    MY ACCOUNT
                </NavLink>
            </div>
        </div>
    );
};
export default NavbarWhite;