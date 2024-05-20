import React, { useState, useEffect } from "react";
import './ProductPrice.scss';
import '../../../utilities/Style.scss';
import { useNavigate } from "react-router-dom";
import { clearSessionStorageProduct } from "../../../utilities/Common";

export default function ProductPrice() {
    const navigate = useNavigate();
    const [productPriceData, setProductPriceData] = useState();
    const [errors, setErrors] = useState({});

    const handleOnChangeField = (fieldName, value) => {
        setProductPriceData(prev => ({
            ...prev,
            [fieldName]: value
        }))
    }

    useEffect(() => {
        const savedData = sessionStorage.getItem('productPriceData');
        if (savedData) {
            const { startPrice, auctionStart, auctionEnd } = JSON.parse(savedData);
            setProductPriceData(prev => ({
                ...prev,
                startPrice,
                auctionStart,
                auctionEnd
            }));
        }
    }, []);

    const handleCancel = () => {
        clearSessionStorageProduct();
        navigate('/my-account/profile');
    }

    const handleBack = () => {
        navigate('/my-account/add-item/product-info');
    };

    const validateInputs = () => {
        let errors = {};

        if (!productPriceData.startPrice || productPriceData.startPrice < 1) {
            errors.price = 'Price must be 1 dollar or greater';
        } else if (!/^[0-9]+(\.[0-9]{1,2})?$/.test(productPriceData.startPrice)) {
            errors.price = 'Price can only be a number with up to 2 decimal places';
        }

        const today = new Date().toISOString().split('T')[0];
        if (!productPriceData.auctionStart || productPriceData.auctionStart < today) {
            errors.startDate = 'Start date cannot be in the past';
        }

        if (!productPriceData.auctionEnd || productPriceData.auctionEnd <= productPriceData.auctionStart) {
            errors.endDate = 'End date must be after the start date';
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleNext = () => {
        if (validateInputs()) {
            sessionStorage.setItem('productPriceData', JSON.stringify(productPriceData));
            navigate('/my-account/add-item/location-shipping');
        }
    };

    return (
        <div className="product-price-form">
            <h5 className="product-add-h5">
                SET PRICES
            </h5>
            <div className="content">
                <div className="fields">
                    <div className="start-price">
                        <p className="product-add-paragraphs">Your start price</p>
                        <div className="input">
                            <button className="currency">$</button>
                            <input
                                type="number"
                                min="1"
                                step="any"
                                value={productPriceData?.startPrice}
                                onChange={(e) => handleOnChangeField('startPrice', parseFloat(e.target.value))}
                            />
                        </div>
                        {errors.price && <p className="error-message">{errors.price}</p>}
                    </div>
                    <div className="dates-and-text">
                        <div className="dates">
                            <div className="start-date">
                                <p className="product-add-paragraphs">Start date</p>
                                <input
                                    type="date"
                                    value={productPriceData?.auctionStart}
                                    onChange={(e) => handleOnChangeField('auctionStart', e.target.value)}
                                />
                            </div>
                            <div className="end-date">
                                <p className="product-add-paragraphs">End date</p>
                                <input
                                    type="date"
                                    value={productPriceData?.auctionEnd}
                                    onChange={(e) => handleOnChangeField('auctionEnd', e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="error-messages">
                            {errors.startDate && <p className="error-message">{errors.startDate}</p>}
                            {errors.endDate && <p className="error-message">{errors.endDate}</p>}
                        </div>
                        <p className="long-text">The auction will be automatically closed when the end time comes. The highest bid will win the auction.</p>
                    </div>
                </div>
                <div className="buttons">
                    <button className="cancel-button" onClick={handleCancel}>CANCEL</button>
                    <div className="back-next-right">
                        <button className="back-button" onClick={handleBack}>BACK</button>
                        <button className="next-button" onClick={handleNext}>NEXT</button>
                    </div>
                </div>
            </div>
        </div>
    );
};