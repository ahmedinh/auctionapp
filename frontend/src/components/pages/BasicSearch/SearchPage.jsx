import React from "react";
import { useSearchParams } from "react-router-dom";
import { useSearchProducts } from "../../../hooks/useSearchProducts";
import MainSearchPage from "./MainSearchPage";


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
    } = useSearchProducts(query, 9);

    return (
        <MainSearchPage
            productsData={data}
            productsStatus={status}
            productsError={error}
            hasNextPage={hasNextPage}
            fetchNextPage={fetchNextPage}
            isFetchingNextPage={isFetchingNextPage}
        />
    );
}