import React from "react";
import "./Footer.scss";
import FacebookIcon from "../icons/FacebookIcon";
import InstagramIcon from "../icons/InstagramIcon";
import TwitterIcon from "../icons/TwitterIcon";

const Footer = () => {
    return (
        <div className="footer">
            <div className="auction">
                <p className="auction-text">
                    AUCTION
                </p>
                <div className="options">
                    <a href="https://www.google.com" className="auction-options">
                        About Us
                    </a>
                    <a href="https://www.google.com" className="auction-options">
                        Terms And Conditions
                    </a>
                    <a href="https://www.google.com" className="auction-options">
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
        </div>
    );
};

export default Footer;