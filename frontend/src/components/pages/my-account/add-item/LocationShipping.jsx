import React, { useEffect, useState } from "react";
import './LocationShipping.scss';
import '../../../utilities/Style.scss';
import { useNavigate } from "react-router-dom";
import { clearSessionStorageProduct, getUser } from "../../../utilities/Common";
import { useProductMutations } from "../../../../hooks/productCreateMutations";

export default function LocationShipping() {
    const navigate = useNavigate();
    const [productName, setProductName] = useState('');
    const [uploadedImages, setUploadedImages] = useState([]);
    const [product, setProduct] = useState();
    const { createProductMutation } = useProductMutations(navigate, productName, uploadedImages);

    const handleOnChangeField = (fieldName, value) => {
        setProduct(prev => ({
            ...prev,
            [fieldName]: value
        }))
    }

    useEffect(() => {
        const user = getUser();
        if (user) {
            setProduct(prev => ({
                ...prev,
                returnAddress: user.shippingAddress,
                returnEmail: user.email,
                returnCity: user.shippingCity,
                returnZipCode: user.zipCode,
                returnCountry: user.country,
                returnPhoneNumber: user.phoneNumber
            }));
        }
    }, []);

    const handleCancel = () => {
        clearSessionStorageProduct();
        navigate('/my-account/profile');
    }

    const handleBack = () => {
        navigate('/my-account/add-item/product-price');
    }

    const deleteProductMutation = useMutation({
        mutationKey: ['delete-product-error'],
        mutationFn: ({ productName }) => deleteProduct({ productName: productName }),
        onSuccess: () => {
            alert('Product deleted successfully')
        },
        onError: (error) => {
            console.error('Error deleting product:', error);
        }
    })

    const addPicturesMutation = useMutation({
        mutationKey: ['adding-product-pictures'],
        mutationFn: ({ uploadedImages, productName }) => addPicturesToProduct({ productPictures: uploadedImages, productName: productName }),
        onSuccess: () => {
            alert('Product added successfully');
            navigate('/home/new-arrivals');
        },
        onError: (error) => {
            console.error('Error creating product:', error);
            deleteProductMutation.mutate({ productName: productName });
        }
    })

    const createProductMutation = useMutation({
        mutationKey: ['creation-of-product'],
        mutationFn: (productData) => createProduct({ productData }),
        onSuccess: () => {
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
            const productData = {
                ...JSON.parse(savedData),
                ...JSON.parse(savedPriceData),
                ...product
            };
            setProductName(productData.name);

            if (productData.uploadedImages) {
                setUploadedImages(productData.uploadedImages.map(({ name, base64 }) => {
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
                            value={product?.returnAddress || ''}
                            onChange={(e) => handleOnChangeField('returnAddress', e.target.value)}
                        />
                    </div>
                    <div className="email">
                        <p className="product-add-paragraphs">
                            Enter Email
                        </p>
                        <input
                            type="text"
                            placeholder="user@domain.com"
                            value={product?.returnEmail || ''}
                            onChange={(e) => handleOnChangeField('returnEmail', e.target.value)}
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
                                value={product?.returnCity || ''}
                                onChange={(e) => handleOnChangeField('returnCity', e.target.value)}
                            />
                        </div>
                        <div className="zip-code">
                            <p className="product-add-paragraphs">
                                Zip Code
                            </p>
                            <input
                                type="text"
                                placeholder="XXXXXXX"
                                value={product?.returnZipCode || ''}
                                onChange={(e) => handleOnChangeField('returnZipCode', e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="country">
                        <p className="product-add-paragraphs">Country</p>
                        <input
                            type="text"
                            placeholder="eg. Spain"
                            value={product?.returnCountry}
                            onChange={(e) => handleOnChangeField('returnCountry', e.target.value)}
                        />
                    </div>
                    <div className="phone-number">
                        <p className="product-add-paragraphs">Phone Number</p>
                        <div className="input-number">
                            <input
                                type="text"
                                placeholder="+32534231564"
                                value={product?.returnPhoneNumber || ''}
                                onChange={(e) => handleOnChangeField('returnPhoneNumber', e.target.value)}
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