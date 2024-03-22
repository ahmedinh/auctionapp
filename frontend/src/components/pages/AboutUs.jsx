import React from "react";
import "./AboutUs.scss";
import PictureTop from "../icons/about_us1.png";
import PictureLeft from "../icons/about_us2.png";
import PictureRight from "../icons/about_us3.png";
import { GoArrowRight } from "react-icons/go";
import { AboutUsPage, common } from "../messages/Text";
import ScrollToTop from "../utilities/ScrollToTop";
import Breadcrumbs from "../utilities/Breadcrumbs";

const AboutUs = () => {
    ScrollToTop();
    return (
        <div className="page">
            <div className="menu-a">
                <div className="left-part-a">
                    <p className="left-part-text">
                        {common.about_us}
                    </p>
                </div>
                <div className="right-part">
                    <Breadcrumbs />
                </div>
            </div>
            <div className="about-us">
                <div className="left-side">
                    <div className="text">
                        <div className="headline">
                            <h5>
                                {common.about_us}
                            </h5>
                            <p className="chapter1">
                                {AboutUsPage.dummy_text}
                            </p>
                        </div>
                        <div className="chapter2">
                            <p>
                                {AboutUsPage.dummy_text}
                            </p>
                        </div>
                        <div className="chapter3">
                            <p>
                                {AboutUsPage.dummy_text}
                            </p>
                        </div>
                        <div className="chapter4">
                            <p>
                                {AboutUsPage.dummy_text}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="images">
                    <img src={PictureTop} alt="PictureTop" className="picture-top" />
                    <div className="bottom-images">
                        <img src={PictureLeft} alt="PictureTop" className="picture-left" />
                        <img src={PictureRight} alt="PictureTop" className="picture-right" />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default AboutUs;