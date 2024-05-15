import React from "react";
import './AddItemLayout.scss';
import BreadCrumbsMenu from "../../../utilities/BreadCrumbsMenu";
import { Outlet, useLocation } from "react-router-dom";
import ScrollToTop from "../../../utilities/ScrollToTop";

export default function AddItemLayout() {

    const location = useLocation();
    const currentRoute = location.pathname;
    ScrollToTop();

    const getDotClass = (index) => {
        if (currentRoute === '/my-account/add-item/product-info' && index === 0) {
            return 'purple-dot filled';
        }
        if (currentRoute === '/my-account/add-item/product-price') {
            return index < 2 ? 'purple-dot filled' : 'purple-dot';
        }
        if (currentRoute === '/my-account/add-item/location-shipping') {
            return 'purple-dot filled';
        }
        return 'purple-dot';
    };

    const getLineClass = (index) => {
        if (currentRoute === '/my-account/add-item/product-price' && index === 0) {
            return 'line purple';
        }
        if (currentRoute === '/my-account/add-item/location-shipping') {
            return 'line purple';
        }
        return 'line';
    };

    return (
        <div className="full-page">
            <BreadCrumbsMenu title="Seller" rightLink="my-account/add-item" fontWeight={700} />
            <div className="content">
                <div className="upper-track">
                    <div className="dots">
                        <div className="white-dots">
                            <span className="white-dot"></span>
                            <span className="white-dot"></span>
                            <span className="white-dot"></span>
                        </div>
                        <div className="purple-dots">
                            {[0, 1, 2].map((index) => (
                                <span key={index} className={getDotClass(index)}></span>
                            ))}
                        </div>
                    </div>
                    <div className="lines">
                        {[0, 1].map((index) => (
                            <hr key={index} className={getLineClass(index)} />
                        ))}
                    </div>
                </div>
                <Outlet />
            </div>
        </div>
    );
};