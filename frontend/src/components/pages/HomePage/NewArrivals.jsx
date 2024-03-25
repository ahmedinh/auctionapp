import React, { useCallback, useEffect, useRef, useState } from "react";
import "./NewArrivals.scss";
import { fetchNewArrivals } from "../../utilities/Api";
import { NavLink } from "react-router-dom";

const NewArrivals = () => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const observer = useRef();
    const loadingRef = useRef(false);

    const loadProducts = useCallback(async () => {
        if (loadingRef.current) return; // Prevent fetch if already loading
        loadingRef.current = true;

        const data = await fetchNewArrivals(page);
        setProducts(prev => [...prev, ...data.content]);
        setPage(prevPage => prevPage + 1);
        setHasMore(page + 1 < data.totalPages);

        loadingRef.current = false;
    }, [page]);

    // Initial fetch & subsequent fetches when 'page' updates
    useEffect(() => {
        if (hasMore) loadProducts();
    }, [loadProducts, hasMore]);

    // Setup IntersectionObserver for infinite scrolling
    useEffect(() => {
        if (!hasMore) return; // Stop setting up the observer if no more products

        const lastProductElement = document.querySelector(".product:last-child");
        if (!lastProductElement) return;

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && !loadingRef.current && hasMore) {
                setPage(prevPage => prevPage + 1);
            }
        }, { threshold: 1.0 });

        observer.current.observe(lastProductElement);

        return () => observer.current?.disconnect();
    }, [hasMore, products.length]); // Depend on products.length to re-initiate observer setup

    return (
        <div className="products">
            <div className="products-grid">
                {products.map(product => (
                    <div className="product" key={product.id}>
                        <NavLink to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <img src={product.picture_url} alt={product.name} />
                            <h5>{product.name}</h5>
                        </NavLink>
                        <p>Start from <span className="price">${product.start_price.toFixed(2)}</span></p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewArrivals;
