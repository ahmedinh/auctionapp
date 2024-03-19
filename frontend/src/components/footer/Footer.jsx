import React from "react";
import "./Footer.scss";
import FacebookIcon from "../icons/FacebookIcon";
import InstagramIcon from "../icons/InstagramIcon";
import TwitterIcon from "../icons/TwitterIcon";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="auction-section">
                <p className="auction-title">
                    AUCTION
                </p>
                <div className="options">
                    <a href="/about-us">
                        About Us
                    </a>
                    <a href="/terms-and-conditions">
                        Terms And Conditions
                    </a>
                    <a href="/privacy-and-policy">
                        Privacy And Policy
                    </a>
                </div>
            </div>
            <div className="get-in-touch">
                <div className="get-in-touch-content">
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
                            <FacebookIcon />
                            <InstagramIcon />
                            <TwitterIcon />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};
export default Footer;