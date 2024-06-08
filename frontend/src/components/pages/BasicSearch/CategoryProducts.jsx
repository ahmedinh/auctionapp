import React, { useState, useEffect } from "react";
import { useCategoryProducts } from "../../../hooks/useCategoryProducts";
import { useParams } from "react-router-dom";
import MainSearchPage from "./MainSearchPage";

export default function CategoryProducts() {
    const { categoryId: urlCategoryId } = useParams();
    const categoryId = urlCategoryId ? urlCategoryId : 0;
    const [sortField, setSortField] = useState('name');
    const [sortDirection, setSortDirection] = useState('asc');
    const [selectedSubCategories, setSelectedSubCategories] = useState([]);

    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
        refetch
    } = useCategoryProducts(categoryId, sortField, sortDirection, selectedSubCategories);

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
                selectedSubCategories={selectedSubCategories}
                setSelectedSubCategories={setSelectedSubCategories}
            />
        </div>
    );
}