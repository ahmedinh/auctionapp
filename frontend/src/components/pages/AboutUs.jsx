import React from "react";
import "./AboutUs.scss";
import PictureTop from "../icons/about_us1.png";
import PictureLeft from "../icons/about_us2.png";
import PictureRight from "../icons/about_us3.png";
import Layout from "../utilities/Layout";

const AboutUs = () => {
    return (
        <Layout>
            <div className="page">
                <div className="menu-a">
                    <div className="left-part-a">
                        <p className="about-us-p">
                            About Us
                        </p>
                    </div>
                    <div className="right-part-a">
                        <a href="" className="home">Home</a>
                        <span>&#8594;</span>
                        <a href="" className="about-us-link">About Us</a>
                    </div>
                </div>
                <div className="about-us">
                    <div className="left-side">
                        <div className="text">
                            <div className="headline">
                                <h5>
                                    About Us
                                </h5>
                                <p className="chapter1">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis consequat pretium turpis, in eleifend mi laoreet sed. Donec ipsum mauris, venenatis sit amet porttitor id, laoreet eu magna. In convallis diam volutpat libero tincidunt semper. Ut aliquet erat rutrum, venenatis lacus ut, ornare lectus. Quisque congue ex sit amet diam malesuada, eget laoreet quam molestie. In id elementum turpis. Curabitur quis tincidunt mauris.
                                </p>
                            </div>
                            <div className="chapter2">
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis consequat pretium turpis, in eleifend mi laoreet sed. Donec ipsum mauris, venenatis sit amet porttitor id, laoreet eu magna. In convallis diam volutpat libero tincidunt semper. Ut aliquet erat rutrum, venenatis lacus ut, ornare lectus. Quisque congue ex sit amet diam malesuada, eget laoreet quam molestie. In id elementum turpis. Curabitur quis tincidunt mauris.
                                </p>
                            </div>
                            <div className="chapter3">
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis consequat pretium turpis, in eleifend mi laoreet sed. Donec ipsum mauris, venenatis sit amet porttitor id, laoreet eu magna. In convallis diam volutpat libero tincidunt semper. Ut aliquet erat rutrum, venenatis lacus ut, ornare lectus. Quisque congue ex sit amet diam malesuada, eget laoreet quam molestie. In id elementum turpis. Curabitur quis tincidunt mauris.
                                </p>
                            </div>
                            <div className="chapter4">
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis consequat pretium turpis, in eleifend mi laoreet sed. Donec ipsum mauris, venenatis sit amet porttitor id, laoreet eu magna. In convallis diam volutpat libero tincidunt semper. Ut aliquet erat rutrum, venenatis lacus ut, ornare lectus. Quisque congue ex sit amet diam malesuada, eget laoreet quam molestie. In id elementum turpis. Curabitur quis tincidunt mauris.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="images">
                        <img src={PictureTop} alt="PictureTop" className="picture-top"/>
                        <div className="bottom-images">
                            <img src={PictureLeft} alt="PictureTop" className="picture-left"/>
                            <img src={PictureRight} alt="PictureTop" className="picture-right"/>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default AboutUs;