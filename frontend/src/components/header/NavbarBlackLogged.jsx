import React, { useState, useEffect } from "react";
import "./NavbarBlackLogged.scss";
import SocialIcons from "../../assets/icons/SocialIcons";
import { removeSession, getUser } from "../utilities/Common";
import { useNavigate } from "react-router-dom";
import { getToken, validToken } from "../utilities/Common";

export default function NavbarBlackLogged() {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    useEffect(() => {
        const user = getUser();
        if (user !== null) {
            setFirstName(user.firstName);
            setLastName(user.lastName);
        }
        if (getToken() && !validToken()) {
            removeSession();
            alert('Your session has expired! Please login again.');
            window.location.reload();
            navigate('/home/new-arrivals');
        }
    }, [])

    const handleLogout = (event) => {
        event.preventDefault();
        removeSession();
        window.location.reload();
        navigate(`/home/new-arrivals`)
    }
    return(
        <nav className="navbar-black-logged">
            <SocialIcons/>
            <div className="welcome-part">
                <p>Hi, {firstName} {lastName}</p>
                <p className="logout-button" onClick={handleLogout}>Logout</p>
            </div>
        </nav>
    );
};