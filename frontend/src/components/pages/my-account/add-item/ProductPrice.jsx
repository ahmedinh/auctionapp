import React from "react";
import './ProductPrice.scss';
import '../../../utilities/Style.scss';
import { useNavigate } from "react-router-dom";

export default function ProductPrice() {
    const navigate = useNavigate();
    const handleCancel = () => {
        sessionStorage.clear();
        navigate('/my-account/profile');
    }
    const handleBack = () => {
        navigate('/my-account/add-item/product-info');
    }
    const handleNext = () => {
        navigate('/my-account/add-item/location-shipping');
    }

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
                            <input type="text" />
                        </div>
                    </div>
                    <div className="dates-and-text">
                        <div className="dates">
                            <div className="start-date">
                                <p className="product-add-paragraphs">Start date</p>
                                <input type="date" name="" id="" />
                            </div>
                            <div className="end-date">
                                <p className="product-add-paragraphs">End date</p>
                                <input type="date" name="" id="" />
                            </div>
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