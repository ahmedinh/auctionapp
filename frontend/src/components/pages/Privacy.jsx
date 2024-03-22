import React from "react";
import "./Privacy.scss";
import { common } from "../messages/Text";
import ScrollToTop from "../utilities/ScrollToTop";

const Privacy = () => {
    ScrollToTop();
    return (
        <div className="full-page">
            <div className="page-content">
                <div className="page-chapter">
                    <h2>Auction Website {common.privacy_and_policy}</h2>
                </div>
                <div className="page-chapter">
                    <p>This privacy policy ("policy") will help you understand how Auction ("us", "we", "our") uses and protects the data you provide to us when you visit and use <a href="/about-us">Auction</a> ("blog", "service").</p>
                    <p>We reserve the right to change this policy at any given time, of which you will be promptly updated. If you want to make sure that you are up to date with the latest changes, we advise you to frequently visit this page.</p>
                </div>
                <div className="page-chapter">
                    <h4>What User Data We Collect</h4>
                    <ul>When you visit the blog, we may collect the following data:</ul>
                    <li>Your IP address.</li>
                    <li>Your contact information and email address.</li>
                    <li>Other information such as interests and preferences.</li>
                    <li>Data profile regarding your online behavior on our blog.</li>
                </div>
                <div className="page-chapter">
                    <h4>Why We Collect Your Data</h4>
                    <ul>We are collecting your data for several reasons:</ul>
                    <li>To better understand your needs.</li>
                    <li>To improve our services and products.</li>
                    <li>To send you promotional emails containing the information we think you will find interesting.</li>
                    <li>To contact you to fill out surveys and participate in other types of market research.</li>
                    <li>To customize our blog according to your online behavior and personal preferences.</li>
                </div>
                <div className="page-chapter">
                    <h4>Safeguarding and Securing the Data</h4>
                    <p>Auction is committed to securing your data and keeping it confidential. Auction has done all in its power to prevent data theft, unauthorized access, and disclosure by implementing the latest technologies and software, which help us safeguard all the information we collect online.</p>
                </div>
                <div className="page-chapter">
                    <h4>Our Cookie Policy</h4>
                    <p>Once you agree to allow our blog to use cookies, you also agree to use the data it collects regarding your online behavior (analyze web traffic, web pages you visit and spend the most time on).</p>
                    <p>The data we collect by using cookies is used to customize our blog to your needs. After we use the data for statistical analysis, the data is completely removed from our systems.</p>
                    <p>Please note that cookies don't allow us to gain control of your computer in any way. They are strictly used to monitor which pages you find useful and which you do not so that we can provide a better experience for you.</p>
                    <p>If you want to disable cookies, you can do it by accessing the settings of your internet browser. You can visit https://www.internetcookies.com, which contains comprehensive information on how to do this on a wide variety of browsers and devices.</p>
                </div>
                <div className="page-chapter">
                    <h4>Links to Other Websites</h4>
                    <p>Our blog contains links that lead to other websites. If you click on these links Auction is not held responsible for your data and privacy protection. Visiting those websites is not governed by this privacy policy agreement. Make sure to read the privacy policy documentation of the website you go to from our website.</p>
                </div>
                <div className="page-chapter">
                    <h4>Restricting the Collection of your Personal Data</h4>
                    <p>At some point, you might wish to restrict the use and collection of your personal data. You can achieve this by doing the following:</p>
                    <p>When you are filling the forms on the blog, make sure to check if there is a box which you can leave unchecked, if you don't want to disclose your personal information.</p>
                    <p>If you have already agreed to share your information with us, feel free to contact us via email and we will be more than happy to change this for you.</p>
                    <p>Auction will not lease, sell or distribute your personal information to any third parties, unless we have your permission. We might do so if the law forces us. Your personal information will be used when we need to send you promotional materials if you agree to this privacy policy.</p>
                </div>
            </div>
        </div>
    );
};
export default Privacy;