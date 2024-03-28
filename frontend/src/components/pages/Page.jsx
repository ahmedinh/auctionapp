import React from "react";
import Breadcrumbs from "../utilities/Breadcrumbs";
import { Outlet, useLocation } from "react-router-dom";
import { common } from "../../messages/Text";
import "./Page.scss";

const Page = () => {
    const location = useLocation();

    const formatTitle = (path) => {
        const paths = path.split('/').filter(Boolean);
        const lastPart = paths[paths.length - 1];
        return lastPart.replace(/-/g, ' ').replace(/\b\w/g, letter => letter.toUpperCase());
    };

    const currentPageTitle = formatTitle(location.pathname);

    return (
        <>
            <div className="menu-a">
                <div className="left-part-a">
                    <p className="left-part-text">
                        {currentPageTitle || common.about_us}
                    </p>
                </div>
                <div className="right-part">
                    <Breadcrumbs />
                </div>
            </div>
            <main><Outlet /></main>
        </>
    );
};
export default Page;
