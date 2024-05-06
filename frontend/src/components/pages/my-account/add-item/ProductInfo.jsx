import React, { useRef, useState, useEffect } from "react";
import './ProductInfo.scss';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
import '../../../utilities/Style.scss';
import { useQuery } from "@tanstack/react-query";
import { fetchCategoriesWithSubCategories } from "../../../../api/categoriesApi";
import { clearSessionStorageProduct } from "../../../utilities/Common";

export default function ProductInfo() {
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState('');
    const [productName, setProductName] = useState('');
    const [selectedSubcategory, setSelectedSubcategory] = useState('');
    const [description, setDescription] = useState('');
    const [uploadedImages, setUploadedImages] = useState([]);
    const fileInputRef = useRef(null);
    const maxWords = 100;
    const maxCharacters = 700;
    const minImages = 3;
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const savedData = sessionStorage.getItem('productInfo');
        if (savedData) {
            const { productName, selectedCategory, selectedSubcategory, description, uploadedImages } = JSON.parse(savedData);
            setProductName(productName || "");
            setSelectedCategory(selectedCategory || "");
            setSelectedSubcategory(selectedSubcategory || "");
            setDescription(description || "");

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


    const {
        data, status, error
    } = useQuery({
        queryKey: ['add-item-categories'],
        queryFn: () => fetchCategoriesWithSubCategories()
    })

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

        if (!productName.trim()) {
            errors.name = 'Product name cannot be empty';
        }

        if (!selectedCategory.trim()) {
            errors.selectedCategory = 'Category must be chosen';
        }

        if (!selectedSubcategory.trim()) {
            errors.selectedSubcategory = 'Subcategory must be chosen';
        }

        if (!description.trim()) {
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
                productName,
                selectedCategory,
                selectedSubcategory,
                description,
                uploadedImages: base64ImagesWithNames
            };

            sessionStorage.setItem('productInfo', JSON.stringify(productData));
            navigate('/my-account/add-item/product-price');
        }
    };


    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const handleSubcategoryChange = (event) => {
        setSelectedSubcategory(event.target.value);
    };

    const handleProductNameChange = (event) => {
        setProductName(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        const inputText = event.target.value;
        const wordsCount = countWords(inputText);
        const charactersCount = inputText.length;

        if (wordsCount <= maxWords && charactersCount <= maxCharacters) {
            setDescription(inputText);
        }
    };

    const countWords = (str) => {
        return str.trim().split(/\s+/).filter(Boolean).length;
    };

    const handleFilesUpload = (files) => {
        const newFiles = Array.from(files);
        setUploadedImages([...uploadedImages, ...newFiles]);
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
    };

    const remainingImages = minImages - uploadedImages.length;

    const wordsCount = countWords(description);
    const charactersCount = description.length;

    const remainingWords = maxWords - wordsCount;
    const remainingCharacters = maxCharacters - charactersCount;

    const subcategories = data?.find(category => category.name === selectedCategory)?.subCategoryProjectionList || [];
    return (
        <div className="product-info-form">
            <div className="upper-part">
                <h5 className="product-add-h5">ADD ITEM</h5>
                <div className="form-fields">
                    <div className="product-name">
                        <p>What do you sell?</p>
                        <input type="text" name="" id="" placeholder="eg. Targeal 7.1 Surround Sound Gaming Headset for PS4" value={productName} onChange={handleProductNameChange} />
                    </div>
                    <div className="categories">
                        <Form.Select className="dropdown-select" onChange={handleCategoryChange} value={selectedCategory}>
                            <option value="" disabled selected hidden>Select Category</option>
                            {data?.map((category, index) => (
                                <option>{category.name}</option>
                            ))}
                        </Form.Select>
                        <Form.Select className="dropdown-select" onChange={handleSubcategoryChange} value={selectedSubcategory}>
                            <option value="" disabled selected hidden>Select Subcategory</option>
                            {subcategories.map((sub, index) => (
                                <option key={index} value={sub.name}>{sub.name}</option>
                            ))}
                        </Form.Select>
                    </div>
                    <div className="description">
                        <p className="description-tag">Description</p>
                        <textarea name="" id="" value={description} onChange={handleDescriptionChange}></textarea>
                        <p className="number-of-words">{remainingWords} words ({remainingCharacters} characters) remaining</p>
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
            {Object.keys(errors).length !== 0 ? (
                <div className="error-messages" style={{ display: 'block' }}>
                    {errors.name && <p className="error-message">{errors.name}</p>}
                    {errors.selectedCategory && <p className="error-message">{errors.selectedCategory}</p>}
                    {errors.selectedSubcategory && <p className="error-message">{errors.selectedSubcategory}</p>}
                    {errors.description && <p className="error-message">{errors.description}</p>}
                </div>
            ) : null}
            <div className="buttons">
                <button onClick={handleCancelClick} className="cancel">CANCEL</button>
                <button onClick={handleNextClick} className="next">NEXT</button>
            </div>
        </div>
    );
};