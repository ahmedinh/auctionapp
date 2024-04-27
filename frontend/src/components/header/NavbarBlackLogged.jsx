import React, { useState, useEffect } from "react";
import "./NavbarBlackLogged.scss";
import SocialIcons from "../../assets/icons/SocialIcons";
import { removeSession } from "../utilities/Common";
import { useNavigate } from "react-router-dom";

export default function NavbarBlackLogged() {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    useEffect(() => {
        if (localStorage.getItem('user') !== null) {
            const user = JSON.parse(localStorage.getItem('user'));
            setFirstName(user.firstName);
            setLastName(user.lastName);
        }
    })

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