import React, { useState, useEffect } from "react";
import { NavLink, useSearchParams, useNavigate } from "react-router-dom";
import { useBasicSearch } from "../../../hooks/useBasicSearch";
import MainSearchPage from "./MainSearchPage";
import Breadcrumbs from "../../utilities/Breadcrumbs";
import { useThresholdSearch } from "../../../hooks/useThresholdSearch";
import "./BasicSearch.scss";


export default function BasicSearch() {
    let [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const query = searchParams.get("query");

    const basicSearchResults = useBasicSearch(query);
    const thresholdSearchResults = useThresholdSearch(query);

    console.log(basicSearchResults.data);

    let [currentPageTitle, setCurrentPageTitle] = useState(`/home/search-results-for-${query}`)
    const thresholdLink = `/home/search-threshold`;

    const handleClick = (e) => {
        e.preventDefault();
        const name = thresholdSearchResults.data?.pages[0].content[0].name;
        setSearchParams({ query: name });
    };

    return (
        <>
            <div className="did-you-mean">
                {thresholdSearchResults.data && thresholdSearchResults.data?.pages[0].content[0].name !== query ? (
                    <p>Did you mean?&nbsp;
                        <a href={thresholdLink} onClick={handleClick} className="navlink">
                            {thresholdSearchResults.data?.pages[0].content[0].name}
                        </a>
                    </p>
                ) : ""}
            </div>
            <div className="menu-a" style={{ height: "30px", marginTop: "1rem" }}>
                <div className="left-part-a" style={{ marginLeft: "22.5rem" }}>
                    <p className="left-part-text" style={{ margin: "0" }}>
                        <Breadcrumbs locationLink={currentPageTitle} />
                    </p>
                </div>
            </div>
            {basicSearchResults ? <MainSearchPage
                productsData={basicSearchResults.data}
                productsStatus={basicSearchResults.status}
                productsError={basicSearchResults.error}
                hasNextPage={basicSearchResults.hasNextPage}
                fetchNextPage={basicSearchResults.fetchNextPage}
                isFetchingNextPage={basicSearchResults.isFetchingNextPage}
            /> : ""}

        </>
    );
}