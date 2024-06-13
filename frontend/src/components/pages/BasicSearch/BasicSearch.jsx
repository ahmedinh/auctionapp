import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import MainSearchPage from "./MainSearchPage";
import Breadcrumbs from "../../utilities/Breadcrumbs";
import { useThresholdSearch } from "../../../hooks/useThresholdSearch";
import { useBasicSearch } from '../../../hooks/useBasicSearch';
import "./BasicSearch.scss";
import { homePageRoute } from "../../utilities/AppUrls";


export default function BasicSearch() {
    let [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get("query");
    const [currentPageTitle, setCurrentPageTitle] = useState(homePageRoute + `search-results-for-${query}`)

    const [sortField, setSortField] = useState('name');
    const [sortDirection, setSortDirection] = useState('asc');
    const [selectedSubCategories, setSelectedSubCategories] = useState([]);
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(1500);
    const [priceChangedFlag, setPriceChangedFlag] = useState(false);

    const {
        data: basicSearchResults,
        status,
        error,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
        refetch
    } = useBasicSearch(query, sortField, sortDirection, selectedSubCategories, minValue, maxValue);
    
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

    useEffect(() => {
        setSelectedSubCategories([]);
        setMinValue(0);
        setMaxValue(1500);
    }, [query]);

    const displaySuggestion = basicSearchResults?.pages[0].empty && thresholdSearchResults?.name && query.toLocaleLowerCase() !== thresholdSearchResults?.name && selectedSubCategories.length === 0 && !priceChangedFlag;

    return (
        <div className="search-page-full">
            <div className="did-you-mean">
                {displaySuggestion ? (
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
                onSortChange={handleSortChange}
                selectedSubCategories={selectedSubCategories}
                setSelectedSubCategories={setSelectedSubCategories}
                minValue={minValue}
                setMinValue={setMinValue}
                maxValue={maxValue}
                setMaxValue={setMaxValue}
                refetch={refetch}
                priceChangedFlag={priceChangedFlag}
                setPriceChangedFlag={setPriceChangedFlag}
            />
        </div>
    );
}