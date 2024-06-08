import React, { useState, useEffect } from "react";
import "./MainSearchPage.scss";
import { useNavigate, useParams } from "react-router-dom";
import ProductCard from "../HomePage/Products/ProductCard";
import { useCategoriesWithSubCategories } from "../../../hooks/useCategoriesWithSubCategories";
import Form from 'react-bootstrap/Form';
import LoadingSpinner from "../../utilities/loading-spinner/LoadingSpinner";
import MultiRangeSlider from "multi-range-slider-react";

export default function MainSearchPage({ productsData, productsStatus, productsError, hasNextPage, fetchNextPage, isFetchingNextPage, onSortChange, selectedSubCategories, setSelectedSubCategories, minValue, setMinValue, maxValue, setMaxValue, refetch, setPriceChangedFlag }) {
    const { categoryId } = useParams();
    const [selected, setSelected] = useState(null);
    const [expandedCategories, setExpandedCategories] = useState([]);
    const [sortCriteria, setSortCriteria] = useState('');
    const [showApplyButton, setShowApplyButton] = useState(false);
    const [initialMinValue, setInitialMinValue] = useState(minValue);
    const [initialMaxValue, setInitialMaxValue] = useState(maxValue);
    const navigate = useNavigate();

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

    const handleInput = (e) => {
        setMinValue(e.minValue);
        setMaxValue(e.maxValue);
        if (e.minValue !== initialMinValue || e.maxValue !== initialMaxValue) {
            setPriceChangedFlag(true);
            setShowApplyButton(true);
        }
    };

    const handleMinChange = (event) => {
        const value = Number(event.target.value);
        if (value <= maxValue) {
            setMinValue(value);
            if (value !== initialMinValue) {
                setPriceChangedFlag(true);
                setShowApplyButton(true);
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
                setShowApplyButton(true);
            }
        } else {
            setMaxValue(minValue);
        }
    };

    const handleApplyClick = () => {
        refetch();
        setInitialMinValue(minValue);
        setInitialMaxValue(maxValue);
        setShowApplyButton(false);
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
        setSelected(i);
        if (expandedCategories.includes(categoryId)) {
            setExpandedCategories([]);
        } else {
            setExpandedCategories([categoryId]);
        }
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
                                min="0"
                                max="1000"
                                className="min-input"
                            />
                            <span>-</span>
                            <input
                                type="text"
                                value={maxValue}
                                onChange={handleMaxChange}
                                min="0"
                                max="1000"
                                className="max-input"
                            />
                        </div>
                        <div className="spinner">
                            <MultiRangeSlider
                                min={0}
                                max={1000}
                                step={1}
                                minValue={minValue}
                                maxValue={maxValue}
                                ruler={false}
                                onInput={(e) => {
                                    handleInput(e);
                                }}
                            />
                        </div>
                        {showApplyButton && (
                            <button className="apply-price-button" onClick={handleApplyClick}>APPLY</button>
                        )}
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
                    </div>
                    <div className="products-content">
                        <div className="products-gridview">
                            {productsData?.pages.flatMap(page => page.content).map(product => (
                                <ProductCard key={product.id} product={product} height="350px" width="262px" />
                            ))}
                        </div>
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