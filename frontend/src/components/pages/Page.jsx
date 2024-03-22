import React from "react";
import Breadcrumbs from "../utilities/Breadcrumbs";
import { Outlet, useLocation } from "react-router-dom"; // Import useLocation
import { common } from "../messages/Text";
import "./Page.scss";

const Page = () => {
    const location = useLocation(); // Use the useLocation hook to get the current path

    // Function to format the last part of the path for display
    const formatTitle = (path) => {
        const paths = path.split('/').filter(Boolean); // Split by '/' and remove empty strings
        const lastPart = paths[paths.length - 1]; // Get the last part of the path
        return lastPart.replace(/-/g, ' ').replace(/\b\w/g, letter => letter.toUpperCase()); // Replace '-' with spaces and capitalize
    };

    // Get the current page title based on the last part of the path
    const currentPageTitle = formatTitle(location.pathname);

    return (
        <>
            <div className="menu-a">
                <div className="left-part-a">
                    <p className="left-part-text">
                        {currentPageTitle || common.about_us} {/* Display the current page title or a default */}
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
