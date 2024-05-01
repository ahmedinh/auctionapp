import React from "react";
import './LocationShipping.scss';
import '../../../utilities/Style.scss';
import { useNavigate } from "react-router-dom";

export default function LocationShipping() {
    const navigate = useNavigate();
    const handleCancel = () => {
        sessionStorage.clear();
        navigate('/my-account/profile');
    }
    const handleBack = () => {
        navigate('/my-account/add-item/product-price');
    }
    const handleNext = () => {
        navigate('/my-account/add-item/location-shipping');
    }
    return (
        <div className="location-shipping-form">
            <h5 className="product-add-h5">
                LOCATION & SHIPPING
            </h5>
            <div className="content">
                <div className="fields">
                    <div className="address">
                        <p className="product-add-paragraphs">Address</p>
                        <input type="text" name="" id="" placeholder="123 Main Street" />
                    </div>
                    <div className="email">
                        <p className="product-add-paragraphs">
                            Enter Email
                        </p>
                        <input type="text" name="" id="" placeholder="user@domain.com" />
                    </div>
                    <div className="city-zip">
                        <div className="city">
                            <p className="product-add-paragraphs">
                                City
                            </p>
                            <input type="text" name="" id="" placeholder="eg. Madrid" />
                        </div>
                        <div className="zip-code">
                            <p className="product-add-paragraphs">
                                Zip Code
                            </p>
                            <input type="text" name="" id="" placeholder="XXXXXXX" />
                        </div>
                    </div>
                    <div className="country">
                        <p className="product-add-paragraphs">Country</p>
                        <input type="text" name="" id="" placeholder="eg. Spain" />
                    </div>
                    <div className="phone-number">
                        <p className="product-add-paragraphs">Phone Number</p>
                        <div className="input-number">
                            <input type="text" name="" id="" placeholder="+32534231564" />
                            <button className="not-verified">Not verified</button>
                        </div>
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