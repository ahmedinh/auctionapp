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
            sessionStorage.clear();
            alert('Your session has expired! Please login again.')
            navigate('/home/new-arrivals')
        }
    }, []);
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