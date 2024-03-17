import React from "react";
import "./NavbarBlack.scss";
import FacebookIcon from "../icons/FacebookIcon";
import InstagramIcon from "../icons/InstagramIcon";
import TwitterIcon from "../icons/TwitterIcon";

const NavbarBlack = () => {
    return (
        <nav className="navbar-black">
            <div className="chunk icons">
                <FacebookIcon size="24px"/>
                <InstagramIcon size="24px"/>
                <TwitterIcon size="24px"/>
            </div>
            <div className="chunk account">
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
