import React from "react";
import "./Home.scss";
import { useCategories } from "../../../hooks/useCategories";
import { useHighlight } from "../../../hooks/useHighlight";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Icon } from '@iconify/react';
import LoadingSpinner from "../../utilities/loading-spinner/LoadingSpinner";

const Home = () => {
    const navigate = useNavigate();
    const { status: categoriesStatus, error: categoriesError, data: categoriesData } = useCategories();
    const { status: highlightStatus, error: highlightError, data: highlightData } = useHighlight();
    if (categoriesStatus === 'pending' || highlightStatus === 'pending') {
        return <LoadingSpinner />;
    }
    if (categoriesStatus === 'error') {
        return <span>Error: {categoriesError.message}</span>;
    }
    if (highlightStatus === 'error') {
        return <span>Error: {highlightError.message}</span>;
    }
    return (
        <div className="page">
            <div className="content">
                <div className="upper-part">
                    <div className="categories">
                        <div className="categories-text">
                            <p>CATEGORIES</p>
                        </div>
                        <div className="list">
                            <ul>
                                {categoriesData?.map((category) => (
                                    <React.Fragment key={category.id}>
                                        <li><NavLink to={`/home/categories/${category.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>{category.name}</NavLink></li>
                                    </React.Fragment>
                                ))}
                                <li><NavLink to="/categories" style={{ textDecoration: 'none', color: 'inherit' }}>All Categories</NavLink></li>
                            </ul>
                        </div>
                    </div>
                    <div className="highlight">
                        <div className="left-side">
                            <div className="product-about">
                                <p className="product-name">{highlightData?.name}</p>
                                <p className="product-price">Start from ${highlightData?.startPrice.toFixed(2)}</p>
                                <p className="product-description">{highlightData?.description.replace(/\\n/g, ' ')}</p>
                            </div>
                            <div className="bid-now">
                                <button type="button" onClick={() => navigate(`/shop/product/${highlightData.id}`)}>BID NOW <Icon icon="akar-icons:chevron-right" /></button>
                            </div>
                        </div>
                        <img src={highlightData?.productPictureList[0].url} alt="HighlightPicture" />
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

        </div>
    );
};
export default Home;