import React from "react";
import { useLocation, Link } from "react-router-dom";
import { GoArrowRight } from "react-icons/go";
import "./Breadcrumbs.scss";

export default function Breadcrumbs({locationLink}) {
    const location = useLocation();

    const formatCrumb = (crumb) => {
        return crumb.replace(/-/g, ' ').replace(/\b\w/g, letter => letter.toUpperCase());
    };

    let currentLink = '';

    const crumbs = locationLink.split('/')
        .filter(crumb => crumb !== '')
        .map((crumb, index, array) => {
            currentLink += `/${crumb}`;
            const isLast = index === array.length - 1;

            return (
                <React.Fragment key={crumb}>
                    <Link to={currentLink} className={`crumb ${isLast ? 'current' : ''}`}>
                        {formatCrumb(crumb)}
                    </Link>
                    {index < array.length - 1 && <GoArrowRight className="arrow" />}
                </React.Fragment>
            );
        });

    return (
        <div className="breadcrumbs" style={{ display: 'flex', alignItems: 'center' }}>
            {crumbs}
        </div>
    );
};
