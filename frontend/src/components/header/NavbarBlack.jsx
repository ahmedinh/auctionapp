import React, { useEffect } from "react";
import "./NavbarBlack.scss";
import SocialIcons from "../../assets/icons/SocialIcons";
import { NavLink, useNavigate } from "react-router-dom";
import { getToken, removeSession, validToken } from "../utilities/Common";

const NavbarBlack = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if (getToken() && !validToken()) {
            removeSession();
            localStorage.clear();
            alert('Your session has expired! Please login again.')
            navigate('/home/new-arrivals')
        }
    }, []);
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