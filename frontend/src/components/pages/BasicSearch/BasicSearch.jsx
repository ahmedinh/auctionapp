import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useBasicSearch } from "../../../hooks/useBasicSearch";
import MainSearchPage from "./MainSearchPage";
import Breadcrumbs from "../../utilities/Breadcrumbs";
import { useThresholdSearch } from "../../../hooks/useThresholdSearch";
import "./BasicSearch.scss";
import { homePageRoute } from "../../utilities/AppUrls";


export default function BasicSearch() {
    let [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get("query");
    const [currentPageTitle, setCurrentPageTitle] = useState(homePageRoute + `search-results-for-${query}`)

    const {
        data: basicSearchResults,
        status,
        error,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage
    } = useBasicSearch(query);
    const {
        data: thresholdSearchResults
    } = useThresholdSearch(query);

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
            <div className="menu-a" >
                <Breadcrumbs locationLink={currentPageTitle} />
            </div>
            <MainSearchPage
                productsData={basicSearchResults}
                productsStatus={status}
                productsError={error}
                hasNextPage={hasNextPage}
                fetchNextPage={fetchNextPage}
                isFetchingNextPage={isFetchingNextPage}
            />

        </div>
    );
}