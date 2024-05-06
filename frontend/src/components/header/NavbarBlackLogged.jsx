import React, { useState, useEffect } from "react";
import "./NavbarBlackLogged.scss";
import SocialIcons from "../../assets/icons/SocialIcons";
import { getUser, removeSession } from "../utilities/Common";

export default function NavbarBlackLogged({ onLogout }) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    useEffect(() => {
        const user = getUser();
        if (user) {
            setFirstName(user.firstName);
            setLastName(user.lastName);
        }
    }, []);

    const handleLogout = (event) => {
        removeSession();
        onLogout(); // Update isLoggedIn state in Layout
    }

    return (
        <nav className="navbar-black-logged">
            <div className="nav-logged-content">
                <SocialIcons />
                <div className="welcome-part">
                    <p>Hi, {firstName} {lastName}</p>
                    <p className="logout-button" onClick={handleLogout}>Logout</p>
                </div>
            </div>
        </nav>
    );
};