import React from "react";
import "./AboutUs.scss";
import PictureTop from "../../../assets/about_us1.png";
import PictureLeft from "../../../assets/about_us2.png";
import PictureRight from "../../../assets/about_us3.png";
import { AboutUsPage, common } from "../../../messages/Text";
import ScrollToTop from "../../utilities/ScrollToTop";
import BreadCrumbsMenu from "../../utilities/BreadCrumbsMenu";

const AboutUs = () => {
    ScrollToTop();
    return (
        <div className="about-us-page">
            <BreadCrumbsMenu title="About Us" rightLink="home/about-us" />
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