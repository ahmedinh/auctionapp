import React, { useState, useEffect } from "react";
import { useCategoryProducts } from "../../../hooks/useCategoryProducts";
import { useParams } from "react-router-dom";
import MainSearchPage from "./MainSearchPage";

export default function CategoryProducts() {
    const { categoryId } = useParams();
    const [sortField, setSortField] = useState('name');
    const [sortDirection, setSortDirection] = useState('asc');

    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
        refetch
    } = useCategoryProducts(categoryId, sortField, sortDirection);

    const handleSortChange = (field, direction) => {
        setSortField(field);
        setSortDirection(direction);
    };

    return (
        <div className="search-page-full">
            <MainSearchPage
                productsData={data}
                productsStatus={status}
                productsError={error}
                hasNextPage={hasNextPage}
                fetchNextPage={fetchNextPage}
                isFetchingNextPage={isFetchingNextPage}
                onSortChange={handleSortChange}
            />
        </div>
    );
}