import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./NavbarWhite.scss";
import Logo from "../../assets/logo.png";
import { Icon } from "@iconify/react";

const NavbarWhite = () => {
    const [input, setInput] = useState("");
    const [isSearchFocused, setSearchFocused] = useState(false);
    const navigate = useNavigate();

    const handleChange = (value) => {
        setInput(value);
    }

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/home/search?query=${encodeURIComponent(input)}`);
    };

    return (
        <div className="navbar-white">
            <div className="left-container">
                <img src={Logo} alt="Logo" className="logo" />
            </div>
            <div className="search">
                <form onSubmit={handleSearch} className="search-container">
                    <input
                        type="text"
                        placeholder="Try enter: Shoes"
                        className="search-bar"
                        onChange={(e) => handleChange(e.target.value)}
                    />
                    <button type="submit" className="search-icon">
                        <Icon icon="mdi-light:magnify" style={{ height: "20px", width: "20px" }} />
                    </button>
                </form>
                {isSearchFocused && (
                    <div className="search-results">

                    </div>
                )}
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