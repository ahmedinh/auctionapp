import React from "react";
import "./Seller.scss";
import { NavLink, Outlet } from "react-router-dom";
import { sellerActiveRoute, sellerSoldRoute } from "../../../utilities/AppUrls";


export default function Seller() {
    return (
        <div className="seller-page">
            <div className="seller-content">
                <div className="menu-buttons">
                    <NavLink to={sellerActiveRoute} className={({ isActive }) =>
                        isActive ? "active-products-1" : "active-products-0"
                    }>
                        Active
                    </NavLink>
                    <NavLink to={sellerSoldRoute} className={({ isActive }) =>
                        isActive ? "active-products-1" : "active-products-0"
                    }>
                        Sold
                    </NavLink>
                </div>
                <Outlet/>
            </div>
        </div>
    );
};