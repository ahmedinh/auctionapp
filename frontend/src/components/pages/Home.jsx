import React, { useEffect, useState } from "react";
import "./Home.scss";
import { fetchCategories, fetchHighlight } from "../utilities/Api";
import { NavLink } from "react-router-dom";
import { Icon } from '@iconify/react';

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
                    <div className="categories-text">
                        <p>CATEGORIES</p>
                    </div>
                    <div className="list">
                        <ul>
                            {categories.map((category) => (
                                <React.Fragment key={category.id}>
                                    <li><NavLink to={`/categories/${category.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>{category.name}</NavLink></li>
                                </React.Fragment>
                            ))}
                            <li><NavLink to="/categories" style={{ textDecoration: 'none', color: 'inherit' }}>All Categories</NavLink></li>
                        </ul>
                    </div>
                </div>
                <div className="highlight">
                    <div className="left-side">
                        <div className="product-about">
                            <p className="product-name">{highlight.name}</p>
                            <p className="product-price">Start from ${highlight.start_price.toFixed(2)}</p>
                            <p className="product-description">{highlight.description}</p>
                        </div>
                        <div className="bid-now">
                            <button type="button">BID NOW <Icon icon="akar-icons:chevron-right" /></button>
                        </div>
                    </div>
                    <img src={highlight.picture_url} alt="HighlightPicture" />
                </div>
            </div>
        </div>
    );
};
export default Home;