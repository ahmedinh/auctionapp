// Products component file
import React, { useRef, useEffect } from "react";
import "./Products.scss";
import ProductCard from "./ProductCard";
import { useProducts } from "../../../../hooks/useProducts";

export function Products({ fetchFunction, queryKeyPrefix }) {
    const {
        status,
        error,
        data,
        isFetchingNextPage,
        hasNextPage,
        fetchNextPage,
    } = useProducts(fetchFunction, queryKeyPrefix);

    const loadMoreRef = useRef(null);

    useEffect(() => {
        if (!hasNextPage || isFetchingNextPage) return;

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                fetchNextPage();
            }
        });

        const currentRef = loadMoreRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    if (status === 'loading') return <h1>Loading...</h1>;
    if (status === 'error') return <h1>Error: {error.message}</h1>;

    return (
        <>
            <div className="products">
                <div className="products-grid">
                    {data?.pages.flatMap(page => page.content).map(product =>
                        <ProductCard key={product.id} product={product} />
                    )}
                </div>
            </div>
            <div ref={loadMoreRef} style={{ height: '20px' }}></div>
        </>
    );
}