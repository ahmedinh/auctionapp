import React, { useState, useEffect } from "react";
import "./MainSearchPage.scss";
import { useNavigate, useParams } from "react-router-dom";
import ProductCard from "../HomePage/Products/ProductCard";
import { useCategoriesWithSubCategories } from "../../../hooks/useCategoriesWithSubCategories";
import Form from 'react-bootstrap/Form';
import LoadingSpinner from "../../utilities/loading-spinner/LoadingSpinner";
import { Icon } from '@iconify/react';
import DollarSign from '../../../assets/dollar-sign-2.png';


export default function MainSearchPage({ productsData, productsStatus, productsError, hasNextPage, fetchNextPage, isFetchingNextPage, onSortChange }) {
    const { categoryId } = useParams();
    const [selected, setSelected] = useState();
    const [sortCriteria, setSortCriteria] = useState('');
    const [view, setView] = useState('grid');
    const navigate = useNavigate();

    const views = {
        GRID: 'grid',
        LIST: 'list'
    }

    const {
        status: categoriesStatus,
        data: categoriesData,
        error: categoriesError,
    } = useCategoriesWithSubCategories();

    useEffect(() => {
        if (categoriesData) {
            const index = categoriesData.findIndex(item => item.id.toString() === categoryId);
            if (index !== -1) {
                setSelected(index);
            }
        }
    }, [categoriesData, categoryId]);

    const toggle = (i) => {
        if (selected === i) {
            return setSelected(null);
        }
        setSelected(i);
    }

    const handleSortChange = (event) => {
        const value = event.target.value;
        let sortField, sortDirection;

        switch (value) {
            case 'CREATED_AT':
                sortField = 'createdAt';
                sortDirection = 'DESC';
                break;
            case 'AUCTION_END':
                sortField = 'auctionEnd';
                sortDirection = 'ASC';
                break;
            case 'START_PRICE_LOW_TO_HIGH':
                sortField = 'startPrice';
                sortDirection = 'ASC';
                break;
            case 'START_PRICE_HIGH_TO_LOW':
                sortField = 'startPrice';
                sortDirection = 'DESC';
                break;
            default:
                sortField = 'name';
                sortDirection = 'ASC';
                break;
        }
        setSortCriteria(value);
        onSortChange(sortField, sortDirection);
    };

    const handleCategoryClick = (i, categoryId) => {
        toggle(i);
        navigate(`/shop/categories/${categoryId}`)
    }

    if (categoriesStatus === 'pending' || productsStatus === 'pending') {
        return <LoadingSpinner />;
    }

    const productDataFlatMap = productsData?.pages.flatMap(page => page.content);

    return (
        <div className="search-page">
            <div className="content">
                <div className="all-filters">
                    <div className="product-categories">
                        <p className="product-categories headline">PRODUCT CATEGORIES</p>
                        {categoriesData?.map((item, i) => (
                            <div className="item" key={item.id}>
                                <div className="title" onClick={() => handleCategoryClick(i, item.id)}>
                                    <p>{item.name}</p>
                                    <span>{selected === i ? '-' : '+'}</span>
                                </div>
                                <div
                                    className={selected === i ? 'subcategories-show' : 'subcategories'}>
                                    {item.subCategoryProjectionList.map((item2, i) => (
                                        <div className="subitem">
                                            <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
                                            <p className="subcategory">{item2.name} ({item2.noOfProducts})</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="products-part">
                    {productsStatus === 'loading' && <p>Loading...</p>}
                    <div className="sorting-grid-list">
                        <Form.Select className="dropdown-select" value={sortCriteria} onChange={handleSortChange}>
                            <option>Default Sorting</option>
                            <option value='CREATED_AT'>Added: New to Old</option>
                            <option value='AUCTION_END'>Time left</option>
                            <option value='START_PRICE_LOW_TO_HIGH'>Price: Low to High</option>
                            <option value='START_PRICE_HIGH_TO_LOW'>Price: High to Low</option>
                        </Form.Select>
                        <div className="view-switch">
                            <button onClick={() => setView(views.GRID)} className={view === 'grid' ? 'grid-button-active' : 'grid-button'}><Icon icon="mdi-light:grid" className="grid-icon" />Grid</button>
                            <button onClick={() => setView(views.LIST)} className={view === 'list' ? 'list-button-active' : 'list-button'}><Icon icon="mdi-light:menu" className="list-icon" />List</button>
                        </div>
                    </div>
                    <div className="products-content">
                        {view === views.GRID ? (<div className="products-gridview">
                            {productsData?.pages.flatMap(page => page.content).map(product => (
                                <ProductCard key={product.id} product={product} height="350px" width="262px" />
                            ))}
                        </div>) : (<div className="products-listview">
                            {productDataFlatMap.map(product => (
                                <div className="product-in-list">
                                    <img src={product.url} alt="" srcset="" />
                                    <div className="product-list-content">
                                        <div className="headline-and-description">
                                            <h5 className="product-list-headline">{product.name}</h5>
                                            <p className="product-list-description">{product.description}</p>
                                        </div>
                                        <p className="start-price">
                                            Start from ${product.startPrice.toFixed(2)}
                                        </p>
                                        <button className="bid-button">
                                            Bid <img src={DollarSign} alt="" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>)}
                        {hasNextPage && (
                            <button className="explore-more-button" onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
                                {isFetchingNextPage ? 'Loading...' : 'Explore More'}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}