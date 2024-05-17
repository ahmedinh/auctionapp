import React from "react";
import './MyProfile.scss';
import '../../../utilities/Style.scss';
import BreadCrumbsMenu from "../../../utilities/BreadCrumbsMenu";
import { NavLink, Outlet } from "react-router-dom";
import { Icon } from '@iconify/react';
import '../../../utilities/Style.scss'
import { myAccountRoute } from "../../../utilities/AppUrls";

const MyProfile = () => {
    return (
        <div className="my-account">
            <BreadCrumbsMenu title="Profile" rightLink="my-account/profile" fontWeight={700} />
            <div className="page-content">
                <div className="nav-buttons">
                    <div className="smaller-buttons">
                        <NavLink to={myAccountRoute + 'profile'} className={({ isActive }) =>
                            isActive ? "active-button-style" : "profile-button"
                        }>
                            <Icon icon="bx:bxs-user" className="icon-styling" />
                            Profile
                        </NavLink>
                        <NavLink to={myAccountRoute + 'seller'} className={({ isActive }) =>
                            isActive ? "active-button-style" : "other-button"
                        }>
                            <Icon icon="oi:list" className="icon-styling" />
                            Seller
                        </NavLink>
                        <NavLink to={myAccountRoute + 'bids'} className={({ isActive }) =>
                            isActive ? "active-button-style" : "other-button"
                        }>
                            <Icon icon="material-symbols:monetization-on" className="icon-styling" />
                            Bids
                        </NavLink>
                        {/* <NavLink to={myAccountRoute + 'wishlist'} className={({ isActive }) =>
                            isActive ? "active-button-style" : "other-button"
                        }>
                            <Icon icon="mdi:heart-outline" className="icon-styling" />
                            Wishlist
                        </NavLink> */}
                        {/* <NavLink to={myAccountRoute + 'settings'} className={({ isActive }) =>
                            isActive ? "active-button-style" : "other-button"
                        }>
                            <Icon icon="fluent:settings-48-regular" className="icon-styling" />
                            Settings
                        </NavLink> */}
                    </div>
                    <NavLink to='/my-account/add-item/product-info' className="add-item-button">
                        <Icon icon="akar-icons:plus" className="icon-styling" />
                        ADD ITEM
                    </NavLink>
                </div>
                <main className="outlet-class"><Outlet /></main>
            </div>
        </div>
    )
}
export default MyProfile;