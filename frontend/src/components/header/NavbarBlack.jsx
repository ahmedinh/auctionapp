import React from "react";
import "./NavbarBlack.scss";
import SocialIcons from "../../assets/icons/SocialIcons";
import { NavLink } from "react-router-dom";

const NavbarBlack = () => {
    return (
        <nav className="navbar-black">
            <SocialIcons />
            <div className="chunk sign-in">
                <NavLink to="/login">Login</NavLink>
                or
                <NavLink to="/register">Create an account</NavLink>
            </div>
        </nav>
    );
};
export default NavbarBlack;