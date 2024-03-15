import React from "react";
import "./Navbar.scss";
import FacebookIcon from "../icons/FacebookIcon";
import InstagramIcon from "../icons/InstagramIcon";
import TwitterIcon from "../icons/TwitterIcon";

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="chunk icons" style={{ gridArea: 'icons' }}> {/* Chunk 2 with Icons */}
                <FacebookIcon size="24px"/>
                <InstagramIcon size="24px"/>
                <TwitterIcon size="24px"/>
            </div>
            <div className="chunk account" style={{ gridArea: 'account' }}>
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

export default Navbar;