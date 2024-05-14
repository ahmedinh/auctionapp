import React from "react";
import { NavLink } from "react-router-dom";
import "./Footer.scss";
import { common } from "../../messages/Text";
import SocialIcons from "../../assets/icons/SocialIcons";
import { homePageRoute } from "../utilities/AppUrls";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="auction-section">
                <p className="auction-title">
                    AUCTION
                </p>
                <div className="options">
                    <NavLink to={homePageRoute + 'about-us'} activeClassName="active">
                        {common.about_us}
                    </NavLink>
                    <NavLink to={homePageRoute + 'terms-and-conditions'} activeClassName="active">
                        {common.terms_and_conditions}
                    </NavLink>
                    <NavLink to={homePageRoute + 'privacy-and-policy'} activeClassName="active">
                        {common.privacy_and_policy}
                    </NavLink>
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
                        <SocialIcons />
                    </div>
                </div>
            </div>
        </footer>
    );
};
export default Footer;