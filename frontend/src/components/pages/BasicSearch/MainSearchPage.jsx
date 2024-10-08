import React, { useState, useEffect } from "react";
import "./MainSearchPage.scss";
import { useNavigate, useParams } from "react-router-dom";
import ProductCard from "../HomePage/Products/ProductCard";
import { useCategoriesWithSubCategories } from "../../../hooks/useCategoriesWithSubCategories";
import Form from 'react-bootstrap/Form';
import LoadingSpinner from "../../utilities/loading-spinner/LoadingSpinner";
import MultiRangeSlider from "multi-range-slider-react";
import { Icon } from '@iconify/react';
import { debounceTimeoutConstant } from "../../utilities/constants";
import { useQueryClient } from "@tanstack/react-query";

export default function MainSearchPage({ productsData, productsStatus, productsError, hasNextPage, fetchNextPage, isFetchingNextPage, onSortChange, selectedSubCategories, setSelectedSubCategories, minValue, setMinValue, maxValue, setMaxValue, refetch, priceChangedFlag, setPriceChangedFlag, fullMinPrice, fullMaxPrice }) {
    const { categoryId } = useParams();
    const [selected, setSelected] = useState(null);
    const [expandedCategories, setExpandedCategories] = useState([]);
    const [sortCriteria, setSortCriteria] = useState('');
    const [initialMinValue, setInitialMinValue] = useState(fullMinPrice);
    const [initialMaxValue, setInitialMaxValue] = useState(fullMaxPrice);
    const [priceApplied, setPriceApplied] = useState(false);
    const [view, setView] = useState('grid');
    const navigate = useNavigate();
    const queryClient = useQueryClient();

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
                setExpandedCategories([categoriesData[index].id]);
            }
        }
    }, [categoriesData, categoryId]);

    const toggleCategory = (categoryId) => {
        if (expandedCategories.includes(categoryId)) {
            setExpandedCategories(expandedCategories.filter(id => id !== categoryId));
        } else {
            setExpandedCategories([...expandedCategories, categoryId]);
        }
    };

    useEffect(() => {
        const handler = setTimeout(() => {
            if (minValue !== initialMinValue || maxValue !== initialMaxValue) {
                refetch();
                setInitialMinValue(minValue);
                setInitialMaxValue(maxValue);
                setPriceApplied(minValue !== fullMinPrice || maxValue !== fullMaxPrice);
            }
        }, debounceTimeoutConstant);

        return () => {
            clearTimeout(handler);
        };
    }, [minValue, maxValue, refetch, initialMinValue, initialMaxValue]);

    const handleInput = (e) => {
        setMinValue(e.minValue);
        setMaxValue(e.maxValue);
        if (e.minValue !== initialMinValue || e.maxValue !== initialMaxValue) {
            setPriceChangedFlag(true);
        } else if (e.minValue === fullMinPrice && e.maxValue === fullMaxPrice) {
            setPriceChangedFlag(false);
        }
    };

    const handleMinChange = (event) => {
        const value = Number(event.target.value);
        if (value <= maxValue) {
            setMinValue(value);
            if (value !== initialMinValue) {
                setPriceChangedFlag(true);
            } else if (value === fullMinPrice && maxValue === fullMaxPrice) {
                setPriceChangedFlag(false);
            }
        } else {
            setMinValue(maxValue);
        }
    };

    const handleMaxChange = (event) => {
        const value = Number(event.target.value);
        if (value >= minValue) {
            setMaxValue(value);
            if (value !== initialMaxValue) {
                setPriceChangedFlag(true);
            } else if (minValue === fullMinPrice && value === fullMaxPrice) {
                setPriceChangedFlag(false);
            }
        } else {
            setMaxValue(minValue);
        }
    };

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
        queryClient.invalidateQueries('categoryProducts');
        setSelected(i);
        setExpandedCategories(expandedCategories.filter(cat => cat.id === categoryId))
        setSelectedSubCategories([]);
        navigate(`/shop/categories/${categoryId}`);
    };

    if (categoriesStatus === 'pending' || productsStatus === 'pending') {
        return <LoadingSpinner />;
    }

    const handleSubCategoryChange = (event) => {
        const { id, checked } = event.target;
        const subcategoryId = Number(id);
        if (checked) {
            setSelectedSubCategories([...selectedSubCategories, subcategoryId]);
        } else {
            setSelectedSubCategories(selectedSubCategories.filter(id => id !== subcategoryId));
        }
    };

    const handleRemoveSubCategory = (subcategoryId) => {
        setSelectedSubCategories(selectedSubCategories.filter(id => id !== subcategoryId));
    };

    const handleRemovePriceFilter = () => {
        setMinValue(fullMinPrice);
        setMaxValue(fullMaxPrice);
        setPriceApplied(false);
        setPriceChangedFlag(false);
        refetch();
    };

    const handleClearAllFilters = () => {
        queryClient.invalidateQueries('categoryProducts');
        queryClient.invalidateQueries('products-basic-search');
        setSelectedSubCategories([]);
        handleRemovePriceFilter();
    };
    const productDataFlatMap = productsData?.pages.flatMap(page => page.content);
    const showPriceFilterTag = priceApplied && priceChangedFlag;
    const showClearAllButton = (selectedSubCategories.length > 0 || showPriceFilterTag);

    return (
        <div className="search-page">
            <div className="content">
                <div className="all-filters">
                    <div className="product-categories">
                        <p className="product-categories headline">PRODUCT CATEGORIES</p>
                        {categoriesData?.map((item, i) => (
                            <div className="item" key={item.id}>
                                <div className="title">
                                    <p onClick={() => handleCategoryClick(i, item.id)}>{item.name}</p>
                                    <span onClick={() => toggleCategory(item.id)}>{expandedCategories.includes(item.id) ? '-' : '+'}</span>
                                </div>
                                <div className={expandedCategories.includes(item.id) ? 'subcategories-show' : 'subcategories'}>
                                    {item.subCategoryProjectionList.map((subCategoryItem, i) => (
                                        <div className="subitem" key={i}>
                                            <input type="checkbox" id={subCategoryItem.id} name={`subcategory-${subCategoryItem.id}`} value={subCategoryItem.name} onChange={handleSubCategoryChange} checked={selectedSubCategories.includes(subCategoryItem.id)} />
                                            <p className="subcategory">{subCategoryItem.name} ({subCategoryItem.noOfProducts})</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="price-filter">
                        <p className="price-range-text">Price Range</p>
                        <div className="numbers">
                            <input
                                type="text"
                                value={minValue}
                                onChange={handleMinChange}
                                min={fullMinPrice}
                                className="min-input"
                            />
                            <span>-</span>
                            <input
                                type="text"
                                value={maxValue}
                                onChange={handleMaxChange}
                                min={fullMinPrice}
                                className="max-input"
                            />
                        </div>
                        <div className="spinner">
                            <MultiRangeSlider
                                min={fullMinPrice}
                                max={fullMaxPrice}
                                step={1}
                                minValue={minValue}
                                maxValue={maxValue}
                                ruler={false}
                                onInput={(e) => {
                                    handleInput(e);
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className="products-part">
                    {productsStatus === 'loading' && <p>Loading...</p>}
                    <div className="filter-tags-bar">
                        {selectedSubCategories.length > 0 && (
                            <div className="filter-category">
                                <span className="tag-headline">Category</span>
                                <div className="tag-content">
                                    {selectedSubCategories.map(id => {
                                        const category = categoriesData?.find(category =>
                                            category.subCategoryProjectionList.some(sub => sub.id === id)
                                        );
                                        const subCategory = category?.subCategoryProjectionList.find(sub => sub.id === id);
                                        return subCategory ? (
                                            <span key={id} className="tag">
                                                {category.name}/{subCategory.name}
                                                <span className="remove-tag" onClick={() => handleRemoveSubCategory(id)}>X</span>
                                            </span>
                                        ) : null;
                                    })}
                                </div>
                            </div>
                        )}
                        {showPriceFilterTag && (
                            <div className="filter-price">
                                <span className="tag-headline">Price Range: </span>
                                <span className="tag">
                                    ${minValue}-${maxValue}
                                    <span className="remove-tag" onClick={handleRemovePriceFilter}>X</span>
                                </span>
                            </div>
                        )}
                        {showClearAllButton && (
                            <div className="clear-all-section">
                                <button onClick={handleClearAllFilters}><p>Clear all</p><span className="remove-tag">X</span></button>
                            </div>
                        )}
                    </div>
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
                            {productDataFlatMap.map(product => (
                                <ProductCard key={product.id} product={product} height="350px" width="262px" grid={true} />
                            ))}
                        </div>) : (<div className="products-listview">
                            {productDataFlatMap.map(product => (
                                <ProductCard key={product.id} product={product} height="350px" width="262px" grid={false} />
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