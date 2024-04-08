import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import MainSearchPage from "./MainSearchPage";
import Breadcrumbs from "../../utilities/Breadcrumbs";
import { useBasicSearch } from "../../../hooks/useBasicSearch";

export default function ThresholdSearch() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("query");
    const thresholdSearchResults = useBasicSearch(query);
    const [currentPageTitle3, setCurrentPageTitle3] = useState("");

    useEffect(() => {
        if (thresholdSearchResults.data && thresholdSearchResults.data.pages.length > 0 && thresholdSearchResults.data.pages[0].content.length > 0) {
            const newTitle = `/home/search-results-for-${thresholdSearchResults.data.pages[0].content[0].name}`;
            setCurrentPageTitle3(newTitle);
        } else {
            setCurrentPageTitle3(`/home/search-results-for-${query}`);
        }
    }, [thresholdSearchResults.data, query]);
    return (
        <>
            <div className="menu-a" style={{ height: "30px", marginTop: "1rem" }}>
                <div className="left-part-a" style={{ marginLeft: "22.5rem" }}>
                    <p className="left-part-text" style={{ margin: "0" }}>
                        <Breadcrumbs locationLink={currentPageTitle3} />
                    </p>
                </div>
            </div>
            <MainSearchPage
                productsData={thresholdSearchResults.data}
                productsStatus={thresholdSearchResults.status}
                productsError={thresholdSearchResults.error}
                hasNextPage={thresholdSearchResults.hasNextPage}
                fetchNextPage={thresholdSearchResults.fetchNextPage}
                isFetchingNextPage={thresholdSearchResults.isFetchingNextPage}
            />
        </>
    );
}