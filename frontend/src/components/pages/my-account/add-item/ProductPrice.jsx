import React, { useState, useEffect } from "react";
import './ProductPrice.scss';
import '../../../utilities/Style.scss';
import { useNavigate } from "react-router-dom";

export default function ProductPrice() {
    const navigate = useNavigate();
    const [price, setPrice] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const savedData = sessionStorage.getItem('productPriceData');
        if (savedData) {
            const { price, startDate, endDate } = JSON.parse(savedData);
            setPrice(price || '');
            setStartDate(startDate || '');
            setEndDate(endDate || '');
        }
    }, []);

    const handleCancel = () => {
        sessionStorage.clear();
        navigate('/my-account/profile');
    };

    const handleBack = () => {
        navigate('/my-account/add-item/product-info');
    };

    const validateInputs = () => {
        let errors = {};

        // Price validation
        if (!price || price < 1) {
            errors.price = 'Price must be 1 dollar or greater';
        }

        // Start date validation
        const today = new Date().toISOString().split('T')[0];
        if (!startDate || startDate < today) {
            errors.startDate = 'Start date cannot be in the past';
        }

        // End date validation
        if (!endDate || endDate <= startDate) {
            errors.endDate = 'End date must be after the start date';
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleNext = () => {
        if (validateInputs()) {
            const productPriceData = {
                price,
                startDate,
                endDate
            };
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
                                value={price}
                                onChange={(e) => setPrice(parseFloat(e.target.value))}
                            />
                        </div>
                    </div>
                    <div className="dates-and-text">
                        <div className="dates">
                            <div className="start-date">
                                <p className="product-add-paragraphs">Start date</p>
                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                />
                            </div>
                            <div className="end-date">
                                <p className="product-add-paragraphs">End date</p>
                                <input
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="error-messages">
                            {errors.price && <p className="error-message">{errors.price}</p>}
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