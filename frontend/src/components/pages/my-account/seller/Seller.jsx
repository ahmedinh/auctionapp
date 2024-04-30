import React from "react";
import "./Seller.scss";
import { NavLink, Outlet } from "react-router-dom";


export default function Seller() {
    return (
        <div className="seller-page">
            <div className="seller-content">
                <div className="menu-buttons">
                    <NavLink to='/my-account/seller/active' className={({ isActive }) =>
                        isActive ? "active-products-1" : "active-products-0"
                    }>
                        Active
                    </NavLink>
                    <NavLink to='/my-account/seller/sold' className={({ isActive }) =>
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