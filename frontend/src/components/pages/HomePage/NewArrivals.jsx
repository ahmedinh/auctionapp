import React, { useEffect, useState } from "react";
import "./NewArrivals.scss";
import { fetchNewArrivals } from "../../utilities/Api";

const NewArrivals = () => {
    
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            const fetchedProducts = await fetchNewArrivals();
            setProducts(fetchedProducts);
        };
        getProducts();
    }, []);
    console.log(products);
    return (
        <div className="products">
            OVO JE NEW ARRIVALS STRANICA.
        </div>
    );
};
export default NewArrivals;