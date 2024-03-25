// NewArrivals.jsx
import React, { useCallback, useEffect, useState } from "react";
import "./NewArrivals.scss";
import { fetchNewArrivals } from "../../utilities/Api";
import ProductCard from './ProductCard';
import useInfiniteScroll from './useInfiniteScroll';

const NewArrivals = () => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    const lastProductElementRef = useInfiniteScroll(setPage, hasMore);

    const loadProducts = useCallback(async () => {
        // Assume the fetch function is correctly fetching and updating 'hasMore'
        const data = await fetchNewArrivals(page);
        setProducts(prev => [...prev, ...data.content]);
        // Determine 'hasMore' based on response
    }, [page]);

    useEffect(() => {
        if (hasMore) loadProducts();
    }, [loadProducts, hasMore]);

    return (
        <div className="products">
            <div className="products-grid">
                {products.map((product, index) => (
                    <ProductCard key={product.id} product={product} 
                        ref={index === products.length - 1 ? lastProductElementRef : undefined} />
                ))}
            </div>
        </div>
    );
};

export default NewArrivals;