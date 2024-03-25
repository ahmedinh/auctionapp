import React, { useCallback, useEffect, useState } from "react";
import "./NewArrivals.scss";
import { fetchLastChance } from "../../utilities/Api";
import ProductCard from './ProductCard';
import useInfiniteScroll from './useInfiniteScroll';

const NewArrivals = () => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    const lastProductElementRef = useInfiniteScroll(setPage, hasMore);

    const loadProducts = useCallback(async () => {
        const data = await fetchLastChance(page);
        setProducts(prev => [...prev, ...data.content]);
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