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
    const [selectedSubcategory, setSelectedSubcategory] = useState('');
    const [description, setDescription] = useState('');
    const [uploadedImages, setUploadedImages] = useState([]);
    const fileInputRef = useRef(null);
    const maxWords = 100;
    const maxCharacters = 700;
    const minImages = 3;

    useEffect(() => {
        const savedData = sessionStorage.getItem('productInfo');
        if (savedData) {
            const { selectedCategory, selectedSubcategory, description, uploadedImages } = JSON.parse(savedData);
            setSelectedCategory(selectedCategory || "");
            setSelectedSubcategory(selectedSubcategory || "");
            setDescription(description || "");
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

    const handleNextClick = () => {
        const productData = {
            selectedCategory,
            selectedSubcategory,
            description
        };
        sessionStorage.setItem('productInfo', JSON.stringify(productData));
        navigate('/my-account/add-item/product-price');
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const handleSubcategoryChange = (event) => {
        setSelectedSubcategory(event.target.value);
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
                        <input type="text" name="" id="" placeholder="eg. Targeal 7.1 Surround Sound Gaming Headset for PS4" />
                    </div>
                    <div className="categories">
                        <Form.Select className="dropdown-select" onChange={handleCategoryChange}>
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
            <div className="buttons">
                <button onClick={handleCancelClick} className="cancel">CANCEL</button>
                <button onClick={handleNextClick} className="next">NEXT</button>
            </div>
        </div>
    );
};