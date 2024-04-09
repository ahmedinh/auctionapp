import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useBasicSearch } from "../../../hooks/useBasicSearch";
import MainSearchPage from "./MainSearchPage";
import Breadcrumbs from "../../utilities/Breadcrumbs";
import { useThresholdSearch } from "../../../hooks/useThresholdSearch";
import "./BasicSearch.scss";


export default function BasicSearch() {
    let [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const query = searchParams.get("query");

    const basicSearchResults = useBasicSearch(query);
    const thresholdSearchResults = useThresholdSearch(query);

    let [currentPageTitle] = useState(`/home/search-results-for-${query}`)
    const thresholdLink = `/home/search-threshold`;
    const suggestedTerm = thresholdSearchResults.data?.pages[0].content[0].name;

    const handleClick = (e) => {
        e.preventDefault();
        navigate(`/home/search-advanced?query=${suggestedTerm}`)
    };

    return (
        <div className="search-page-full">
            <div className="did-you-mean">
                {!basicSearchResults.data && suggestedTerm !== query ? (
                    <p>Did you mean?&nbsp;
                        <a href={thresholdLink} onClick={handleClick} className="navlink">
                            {suggestedTerm}
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
            <MainSearchPage
                productsData={basicSearchResults.data}
                productsStatus={basicSearchResults.status}
                productsError={basicSearchResults.error}
                hasNextPage={basicSearchResults.hasNextPage}
                fetchNextPage={basicSearchResults.fetchNextPage}
                isFetchingNextPage={basicSearchResults.isFetchingNextPage}
            />
        </div>
    );
}