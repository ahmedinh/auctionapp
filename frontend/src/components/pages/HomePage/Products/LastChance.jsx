import React, { useCallback, useEffect, useRef, useState } from "react";
import "./Products.scss";
import { fetchLastChance } from "../../../utilities/Api";
import ProductCard from "./ProductCard";

const LastChance = () => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const observer = useRef();
    const loadingRef = useRef(false);

    const loadProducts = useCallback(async () => {
        if (loadingRef.current) return;
        loadingRef.current = true;

        const data = await fetchLastChance(page);
        setProducts(prev => [...prev, ...data.content]);
        setPage(prevPage => prevPage + 1);
        setHasMore(page + 1 < data.totalPages);

        loadingRef.current = false;
    }, [page]);

    useEffect(() => {
        if (hasMore) loadProducts();
    }, [loadProducts, hasMore]);

    useEffect(() => {
        if (!hasMore) return;

        const lastProductElement = document.querySelector(".product:last-child");
        if (!lastProductElement) return;

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && !loadingRef.current && hasMore) {
                setPage(prevPage => prevPage + 1);
            }
        }, { threshold: 1.0 });

        observer.current.observe(lastProductElement);

        return () => observer.current?.disconnect();
    }, [hasMore, products.length]);

    return (
        <div className="products">
            <div className="products-grid">
                {products.map(product => <ProductCard key={product.id} product={product} />)}
            </div>
        </div>
    );
};

export default LastChance;