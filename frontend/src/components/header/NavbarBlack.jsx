import React from "react";
import "./NavbarBlack.scss";
import SocialIcons from "../../assets/icons/SocialIcons";

const NavbarBlack = () => {
    return (
        <nav className="navbar-black">
            <SocialIcons />
            <div className="chunk sign-in">
                <a href="https://www.facebook.com">
                    Login
                </a>
                or
                <a href="https://www.facebook.com">
                    Create an account
                </a>
            </div>
        </nav>
    );
};
export default NavbarBlack;