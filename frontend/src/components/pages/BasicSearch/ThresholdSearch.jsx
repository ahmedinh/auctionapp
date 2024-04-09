import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import MainSearchPage from "./MainSearchPage";
import Breadcrumbs from "../../utilities/Breadcrumbs";
import "./BasicSearch.scss";
import { useBasicSearch } from "../../../hooks/useBasicSearch";


export default function Thresholdsearch() {
    let [searchParams] = useSearchParams();
    const query = searchParams.get("query");
    const thresholdSearchResults = useBasicSearch(query);
    const suggestedTerm = thresholdSearchResults.data?.pages[0].content[0].name;
    let currentPageTitle = `/home/search-results-for-${query}`;

    useEffect(() => {
        if(suggestedTerm && suggestedTerm !== query) {
            searchParams.set('query', suggestedTerm);
            window.history.replaceState(null, '', `?${searchParams.toString()}`);
        }
    }, [query, suggestedTerm]);

    return (
        <>
            <div className="menu-a" style={{ height: "30px", marginTop: "1rem" }}>
                <div className="left-part-a" style={{ marginLeft: "22.5rem" }}>
                    <p className="left-part-text" style={{ margin: "0" }}>
                        <Breadcrumbs locationLink={currentPageTitle} />
                    </p>
                </div>
            </div>
            {thresholdSearchResults ? <MainSearchPage
                productsData={thresholdSearchResults.data}
                productsStatus={thresholdSearchResults.status}
                productsError={thresholdSearchResults.error}
                hasNextPage={thresholdSearchResults.hasNextPage}
                fetchNextPage={thresholdSearchResults.fetchNextPage}
                isFetchingNextPage={thresholdSearchResults.isFetchingNextPage}
            /> : ""}
        </>
    );
}