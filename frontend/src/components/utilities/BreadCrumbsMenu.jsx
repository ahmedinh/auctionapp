import React from "react";
import Breadcrumbs from "./Breadcrumbs";
import { common } from "../../messages/Text";
import "./BreadCrumbsMenu.scss";

const BreadCrumbsMenu = ({ title, rightLink, fontWeight = 400 }) => {
    const formatTitle = (path) => {
        const paths = path.split('/').filter(Boolean);
        const lastPart = paths[paths.length - 1];
        return lastPart.replace(/-/g, ' ').replace(/\b\w/g, letter => letter.toUpperCase());
    };

    const currentPageTitle = formatTitle(title);

    return (
        <>
            <div className="full-bar">
                <div className="content-breadcrumbs">
                    <div className="left-part-a">
                        <p className="left-part-text" style={{ fontWeight }}>
                            {currentPageTitle || common.about_us}
                        </p>
                    </div>
                    <div className="right-part">
                        <Breadcrumbs locationLink={rightLink} />
                    </div>
                </div>
            </div>
        </>
    );
};
export default BreadCrumbsMenu;
