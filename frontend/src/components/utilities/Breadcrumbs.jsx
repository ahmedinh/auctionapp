import React from "react";
import { useLocation, Link } from "react-router-dom";
import { GoArrowRight } from "react-icons/go";
import "./Breadcrumbs.scss";

export default function Breadcrumbs({locationLink}) {
    const location = useLocation();

    const formatCrumb = (crumb, isLast) => {
        const crumbText = crumb.replace(/-/g, ' ').replace(/\b\w/g, letter => letter.toUpperCase());
        if (isLast && location.pathname.includes('/search') && location.search) {
            const searchParams = new URLSearchParams(location.search);
            const query = searchParams.get('query');
            if (query) {
                return (
                    <span>
                        Search Results For <i>{query}</i>
                    </span>
                );
            }
        }
        return crumbText;
    };

    const crumbs = locationLink.split('/')
        .filter(crumb => crumb !== '')
        .map((crumb, index, array) => {
            const currentLink = location.pathname.split('/').slice(0, index + 1).join('/') || '/';
            const isLast = index === array.length - 1;

            return (
                <React.Fragment key={crumb}>
                    <Link to={currentLink} className={`crumb ${isLast ? 'current' : ''}`}>
                        {formatCrumb(crumb, isLast)}
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
