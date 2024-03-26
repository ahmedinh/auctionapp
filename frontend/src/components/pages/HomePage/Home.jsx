import React from "react";
import "./Home.scss";
import useCategories from "../../../hooks/useCategories";
import useHighlight from "../../../hooks/useHighlight";
import { NavLink, Outlet } from "react-router-dom";
import { Icon } from '@iconify/react';

const Home = () => {
    const { categories, isCategoriesLoading, categoriesError  } = useCategories();
    const { highlight, isHighlightLoading, highlightError  } = useHighlight();

    if (isCategoriesLoading || isHighlightLoading) return <p>Loading...</p>;
    if (categoriesError || highlightError) return <p>Error fetching data</p>;

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
            <div className="bottom">
                <div className="menu-bar">
                    <NavLink to="/home/new-arrivals" className="link" activeClassName="active">
                        New Arrivals
                    </NavLink>
                    <NavLink to="/home/last-chance" className="link" activeClassName="active">
                        Last Chance
                    </NavLink>
                </div>
                <hr />
                <main><Outlet /></main>
            </div>
        </div>
    );
};
export default Home;