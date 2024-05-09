import React from "react";
import "./NavbarBlack.scss";
import SocialIcons from "../../assets/icons/SocialIcons";
import { NavLink } from "react-router-dom";

const NavbarBlack = () => {
    return (
        <nav className="navbar-black">
            <div className="nav-black-content">
                <SocialIcons />
                <div className="auth-links">
                    <NavLink to="/login">Login</NavLink>
                    or
                    <NavLink to="/register">Create an account</NavLink>
                </div>
            </div>
        </nav>
    );
};
export default NavbarBlack;