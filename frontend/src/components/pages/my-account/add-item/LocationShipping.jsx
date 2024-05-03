import React, { useEffect, useState } from "react";
import './LocationShipping.scss';
import '../../../utilities/Style.scss';
import { useNavigate } from "react-router-dom";
import { clearSessionStorageProduct, getUser } from "../../../utilities/Common";

export default function LocationShipping() {
    const navigate = useNavigate();
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [country, setCountry] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    useEffect(() => {
        const user = getUser();
        if (user) {
            setAddress(user.shippingAddress);
            setEmail(user.email);
            setCity(user.shippingCity);
            setZipcode(user.zipCode);
            setCountry(user.country);
            setPhoneNumber(user.phoneNumber);
        }
    }, []);

    const handleCancel = () => {
        clearSessionStorageProduct();
        navigate('/my-account/profile');
    }

    const handleBack = () => {
        navigate('/my-account/add-item/product-price');
    }

    const handleDone = () => {
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
                        <input
                            type="text"
                            placeholder="123 Main Street"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                    <div className="email">
                        <p className="product-add-paragraphs">
                            Enter Email
                        </p>
                        <input
                            type="text"
                            placeholder="user@domain.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="city-zip">
                        <div className="city">
                            <p className="product-add-paragraphs">
                                City
                            </p>
                            <input
                                type="text"
                                placeholder="eg. Madrid"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </div>
                        <div className="zip-code">
                            <p className="product-add-paragraphs">
                                Zip Code
                            </p>
                            <input
                                type="text"
                                placeholder="XXXXXXX"
                                value={zipcode}
                                onChange={(e) => setZipcode(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="country">
                        <p className="product-add-paragraphs">Country</p>
                        <input
                            type="text"
                            placeholder="eg. Spain"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                        />
                    </div>
                    <div className="phone-number">
                        <p className="product-add-paragraphs">Phone Number</p>
                        <div className="input-number">
                            <input
                                type="text"
                                placeholder="+32534231564"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                            <button className="not-verified">Not verified</button>
                        </div>
                    </div>
                </div>
                <div className="buttons">
                    <button className="cancel-button" onClick={handleCancel}>CANCEL</button>
                    <div className="back-next-right">
                        <button className="back-button" onClick={handleBack}>BACK</button>
                        <button className="next-button" onClick={handleDone}>DONE</button>
                    </div>
                </div>
            </div>
        </div>
    );
};