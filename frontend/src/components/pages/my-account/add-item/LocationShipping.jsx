import React, { useEffect, useState } from "react";
import './LocationShipping.scss';
import '../../../utilities/Style.scss';
import { useNavigate } from "react-router-dom";
import { clearSessionStorageProduct, getToken, getUser } from "../../../utilities/Common";
import { useMutation } from "@tanstack/react-query";
import { addPicturesToProduct, createProduct } from "../../../../api/productsApi";

export default function LocationShipping() {
    const navigate = useNavigate();
    const [productName, setProductName] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [country, setCountry] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [uploadedImages, setUploadedImages] = useState([]);
    let [sendingData, setSendingData] = useState({});

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

    const addPicturesMutation = useMutation({
        mutationKey: ['adding-product-pictures'],
        mutationFn: ({ uploadedImages, productName }) => addPicturesToProduct({ productPictures: uploadedImages, productName: productName }),
        onSuccess: () => {
            alert('Pictures added successfully')
        }
    })

    const createProductMutation = useMutation({
        mutationKey: ['creation-of-product'],
        mutationFn: (sendingData) => createProduct({ productData: sendingData }),
        onSuccess: () => {
            alert('Product added successfully')
            addPicturesMutation.mutate({ uploadedImages, productName: productName });
        },
        onError: (error) => {
            console.error('Error creating product:', error);
        }
    });

    const handleDone = () => {
        const savedData = sessionStorage.getItem('productInfo');
        const savedPriceData = sessionStorage.getItem('productPriceData');

        if (savedData && savedPriceData) {
            const { productName, selectedCategory, selectedSubcategory, description, uploadedImages } = JSON.parse(savedData);
            const { price, startDate, endDate } = JSON.parse(savedPriceData);

            const productData = {
                name: productName,
                description,
                startPrice: price,
                auctionStart: startDate,
                auctionEnd: endDate,
                selectedSubcategory,
                selectedCategory
            };
            setProductName(productData.name);

            if (uploadedImages) {
                setUploadedImages(uploadedImages.map(({ name, base64 }) => {
                    const arr = base64.split(','), mime = arr[0].match(/:(.*?);/)[1];
                    const bstr = atob(arr[1]);
                    let n = bstr.length, u8arr = new Uint8Array(n);
                    while (n--) {
                        u8arr[n] = bstr.charCodeAt(n);
                    }
                    return new File([u8arr], name, { type: mime });
                }));
            }

            createProductMutation.mutate(productData);
        } else {
            console.error('Missing product or price data');
        }
    };

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