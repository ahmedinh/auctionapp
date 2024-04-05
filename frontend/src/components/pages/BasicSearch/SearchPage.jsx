import React from "react";
import { useSearchParams } from "react-router-dom";
import { useSearchProducts } from "../../../hooks/useSearchProducts";
import MainSearchPage from "./MainSearchPage";
import Breadcrumbs from "../../utilities/Breadcrumbs";


export default function SearchPage() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("query");

    const {
        status,
        error,
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useSearchProducts(query);

    const currentPageTitle = "/home/search-results-for-" + query;

    return (
        <>
            <div className="menu-a" style={{ height: "30px", marginTop: "1rem"}}>
                <div className="left-part-a" style={{ marginLeft: "22.5rem"}}>
                    <p className="left-part-text" style={{ margin: "0" }}>
                        <Breadcrumbs locationLink={currentPageTitle} />
                    </p>
                </div>
            </div>
            <MainSearchPage
                productsData={data}
                productsStatus={status}
                productsError={error}
                hasNextPage={hasNextPage}
                fetchNextPage={fetchNextPage}
                isFetchingNextPage={isFetchingNextPage}
            />
        </>
    );
}