import React from "react";
import { getProductsForCategory } from "../../../api/productsApi";
import { useCategoryProducts } from "../../../hooks/useCategoryProducts";
import { useParams } from "react-router-dom";
import MainSearchPage from "./MainSearchPage";

export default function CategoryProducts() {
    const { categoryId } = useParams();

    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
    } = useCategoryProducts(getProductsForCategory, 9, categoryId);

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