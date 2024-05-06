import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import MainSearchPage from "./MainSearchPage";
import Breadcrumbs from "../../utilities/Breadcrumbs";
import { useThresholdSearch } from "../../../hooks/useThresholdSearch";
import { useBasicSearch } from '../../../hooks/useBasicSearch';
import "./BasicSearch.scss";


export default function BasicSearch() {
    let [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get("query");
    const currentPageTitle = `/home/search-results-for-${query}`;

    const [sortField, setSortField] = useState('name');
    const [sortDirection, setSortDirection] = useState('asc');

    const {
        data: basicSearchResults,
        status,
        error,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
        refetch
    } = useBasicSearch(query, sortField, sortDirection);
    
    const {
        data: thresholdSearchResults
    } = useThresholdSearch(query);

    const handleSortChange = (field, direction) => {
        setSortField(field);
        setSortDirection(direction);
    };

    const handleClick = (e) => {
        e.preventDefault();
        const name = thresholdSearchResults?.name;
        setSearchParams({ query: name });
    };

    return (
        <div className="search-page-full">
            <div className="did-you-mean">
                {basicSearchResults?.pages[0].empty && thresholdSearchResults?.name ? (
                    <p className="paragraph">Did you mean?&nbsp;
                        <a onClick={handleClick} className="navlink">
                            {thresholdSearchResults?.name}
                        </a>
                    </p>
                ) : ""}
            </div>
            <div className="menu-a">
                <Breadcrumbs locationLink={currentPageTitle} />
            </div>
            <MainSearchPage
                productsData={basicSearchResults}
                productsStatus={status}
                productsError={error}
                hasNextPage={hasNextPage}
                fetchNextPage={fetchNextPage}
                isFetchingNextPage={isFetchingNextPage}
                onSortChange={handleSortChange} // Pass the sorting handler to MainSearchPage
            />
        </div>
    );
}