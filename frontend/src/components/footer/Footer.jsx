import React from "react";
import "./Footer.scss";
import FacebookIcon from "../icons/FacebookIcon";
import InstagramIcon from "../icons/InstagramIcon";
import TwitterIcon from "../icons/TwitterIcon";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="auction">
                <p className="auction-text">
                    AUCTION
                </p>
                <div className="options">
                    <a href="/about-us" className="auction-options">
                        About Us
                    </a>
                    <a href="/terms-and-conditions" className="auction-options">
                        Terms And Conditions
                    </a>
                    <a href="/privacy-and-policy" className="auction-options">
                        Privacy And Policy
                    </a>
                </div>
            </div>
            <div className="git">
                <div className="get-in-touch">
                    <p className="get-in-touch-text">
                        GET IN TOUCH
                    </p>
                    <div className="other">
                        <p className="call">
                            Call Us at +123 797-567-2535
                        </p>
                        <p className="email">
                            support@auction.com
                        </p>
                        <div className="icons">
                            <FacebookIcon size="24px"/>
                            <InstagramIcon size="24px"/>
                            <TwitterIcon size="24px"/>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;