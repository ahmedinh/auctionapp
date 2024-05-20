import React, { useRef, useState, useEffect } from "react";
import './ProductInfo.scss';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
import '../../../utilities/Style.scss';
import { clearSessionStorageProduct } from "../../../utilities/Common";
import { useCategoriesWithSubCategories } from "../../../../hooks/categoriesWithSubcategories";

export default function ProductInfo() {
    const navigate = useNavigate();
    const [uploadedImages, setUploadedImages] = useState([]);
    const [productInfo, setProductInfo] = useState({
        name: '',
        selectedCategory: '',
        selectedSubcategory: '',
        description: ''
    });
    const fileInputRef = useRef(null);
    const maxWords = 100;
    const maxCharacters = 700;
    const minImages = 3;
    const [errors, setErrors] = useState({});
    const categoriesWithSubcategories = useCategoriesWithSubCategories();

    const handleOnChangeField = (fieldName, value) => {
        setProductInfo(prev => ({
            ...prev,
            [fieldName]: value
        }))
    }

    useEffect(() => {
        const savedData = sessionStorage.getItem('productInfo');
        if (savedData) {
            const { name, selectedCategory, selectedSubcategory, description, uploadedImages } = JSON.parse(savedData);
            setProductInfo({ name, selectedCategory, selectedSubcategory, description });

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
        }
    }, []);

    const handleCancelClick = () => {
        clearSessionStorageProduct();
        navigate('/my-account/profile');
    }

    const fileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    const validateInputs = () => {
        let errors = {};

        if (!productInfo?.name.trim()) {
            errors.name = 'Product name cannot be empty';
        }

        if (!productInfo?.selectedCategory.trim()) {
            errors.selectedCategory = 'Category must be chosen';
        }

        if (!productInfo?.selectedSubcategory.trim()) {
            errors.selectedSubcategory = 'Subcategory must be chosen';
        }

        if (!productInfo?.description.trim()) {
            errors.description = 'Description cannot be empty';
        }

        if (uploadedImages.length < 3) {
            errors.images = 'You must place 3 images of product';
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    }

    const handleNextClick = async () => {
        if (validateInputs()) {
            const base64ImagesWithNames = await Promise.all(uploadedImages.map(async (file) => {
                const base64 = await fileToBase64(file);
                return { name: file.name, base64 };
            }));

            const productData = {
                ...productInfo,
                uploadedImages: base64ImagesWithNames
            };

            sessionStorage.setItem('productInfo', JSON.stringify(productData));
            navigate('/my-account/add-item/product-price');
        }
    };

    const handleDescriptionChange = (event) => {
        const inputText = event.target.value;
        const wordsCount = countWords(inputText);
        const charactersCount = inputText.length;

        if (wordsCount <= maxWords && charactersCount <= maxCharacters) {
            setProductInfo(prev => ({
                ...prev,
                description: inputText
            }));
        }
    };

    const countWords = (str) => {
        return str.trim().split(/\s+/).filter(Boolean).length;
    };

    const handleFilesUpload = (files) => {
        const newFiles = Array.from(files);
        setUploadedImages([...uploadedImages, ...newFiles]);
        fileInputRef.current.value = null;
    };

    const handleFileInputChange = (event) => {
        handleFilesUpload(event.target.files);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (event) => {
        event.preventDefault();
        handleFilesUpload(event.dataTransfer.files);
    };

    const handleDivClick = () => {
        fileInputRef.current.click();
    };

    const handleRemoveImage = (index) => {
        setUploadedImages((prevImages) => prevImages.filter((_, i) => i !== index));
        fileInputRef.current.value = null;
    };

    const remainingImages = minImages - uploadedImages.length;

    const wordsCount = countWords(productInfo?.description);
    const charactersCount = productInfo.description.length;

    const remainingWords = maxWords - wordsCount;
    const remainingCharacters = maxCharacters - charactersCount;

    const subcategories = categoriesWithSubcategories.data?.find(category => category.name === productInfo?.selectedCategory)?.subCategoryProjectionList || [];
    return (
        <div className="product-info-form">
            <div className="upper-part">
                <h5 className="product-add-h5">ADD ITEM</h5>
                <div className="form-fields">
                    <div className="product-name">
                        <p>What do you sell?</p>
                        <input type="text" name="" id="" placeholder="eg. Targeal 7.1 Surround Sound Gaming Headset for PS4" value={productInfo?.name} onChange={(e) => handleOnChangeField('name', e.target.value)} />
                        {errors.name && <p className="error-message">{errors.name}</p>}
                    </div>
                    <div className="categories">
                        <Form.Select className="dropdown-select" onChange={(e) => handleOnChangeField('selectedCategory', e.target.value)} value={productInfo?.selectedCategory}>
                            <option value="" disabled selected hidden>Select Category</option>
                            {categoriesWithSubcategories.data?.map((category, index) => (
                                <option>{category.name}</option>
                            ))}
                        </Form.Select>
                        <Form.Select className="dropdown-select" onChange={(e) => handleOnChangeField('selectedSubcategory', e.target.value)} value={productInfo?.selectedSubcategory}>
                            <option value="" disabled selected hidden>Select Subcategory</option>
                            {subcategories.map((sub, index) => (
                                <option key={index} value={sub.name}>{sub.name}</option>
                            ))}
                        </Form.Select>
                    </div>
                    {errors.selectedCategory || errors.selectedSubcategory ? (<div className="category-errors">
                        {errors.selectedCategory && <p className="error-message">{errors.selectedCategory}</p>}
                        {errors.selectedSubcategory && <p className="error-message">{errors.selectedSubcategory}</p>}
                    </div>) : null}
                    <div className="description">
                        <p className="description-tag">Description</p>
                        <textarea name="" id="" value={productInfo?.description} onChange={handleDescriptionChange}></textarea>
                        <p className="number-of-words">{remainingWords} words ({remainingCharacters} characters) remaining</p>
                        {errors.description && <p className="error-message">{errors.description}</p>}
                    </div>
                    <div
                        className="drag-drop-field"
                        onClick={handleDivClick}
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                    >
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={handleFileInputChange}
                        />
                        <div className="first-two">
                            <p className="upload-photos">Upload Photos</p>
                            <p className="or-just">or just drag and drop</p>
                        </div>
                        <p className="at-least-3-photos">
                            {remainingImages > 0 ? `Upload ${remainingImages} more picture${remainingImages > 1 ? 's' : ''}` : "All required pictures uploaded"}
                        </p>
                    </div>
                    <div className="uploaded-images">
                        {uploadedImages.map((file, index) => (
                            <div className="pictures-display" key={index} style={{ position: 'relative', display: 'inline-block', margin: '10px' }}>
                                <img
                                    src={URL.createObjectURL(file)}
                                    alt={`Uploaded ${index + 1}`}
                                    style={{ width: "100px", height: "100px" }}
                                />
                                <button className="picture-removal-button"
                                    onClick={() => handleRemoveImage(index)}
                                >
                                    &times;
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="buttons">
                <button onClick={handleCancelClick} className="cancel">CANCEL</button>
                <button onClick={handleNextClick} className="next">NEXT</button>
            </div>
        </div>
    );
};