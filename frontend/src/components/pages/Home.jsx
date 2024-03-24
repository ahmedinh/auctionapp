import React, { useEffect, useState } from "react";
import "./Home.scss";
import { fetchCategories, fetchHighlight } from "../utilities/Api";

const Home = () => {
    const [categories, setCategories] = useState([]);
    const [highlight, setHighlight] = useState({
        id: null,
        name: "",
        description: "",
        start_price: 0,
        picture_url: ""
    });

    useEffect(() => {
        const getCategories = async () => {
            const fetchedCategories = await fetchCategories();
            setCategories(fetchedCategories);
        };
        getCategories();
        const getHighlight = async () => {
            const fetchedHighlight = await fetchHighlight();
            setHighlight(fetchedHighlight);
        };
        getHighlight();
    }, []);

    return (
        <div className="page">
            <div className="upper-part">
                <div className="categories">
                    <ul>
                        {categories.map((category) => (
                            <li key={category.id}>{category.name}</li>
                        ))}
                    </ul>
                </div>
                <div className="highlight">
                    <div className="left-side">
                        <div className="product-about">
                            <p className="product-name">{highlight.name}</p>
                            <p className="product-price">Start from ${highlight.start_price.toFixed(2)}</p>
                            <p className="product-description">{highlight.description}</p>
                        </div>
                        <div className="bid-now">
                            <button type="button">BID NOW</button>
                        </div>
                    </div>
                    <img src={highlight.picture_url} alt="" srcset="" />
                </div>
            </div>
        </div>
    );
};
export default Home;