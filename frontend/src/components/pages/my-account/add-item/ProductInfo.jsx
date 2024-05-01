import React from "react";
import './ProductInfo.scss';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
import '../../../utilities/Style.scss';

export default function ProductInfo() {
    const navigate = useNavigate();

    const handleCancelClick = () => {
        sessionStorage.clear();
        navigate('/my-account/profile');
    };

    const handleNextClick = () => {
        navigate('/my-account/add-item/product-price');
    }

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
                        <Form.Select className="dropdown-select">
                            <option value="" disabled selected hidden>Select Category</option>
                            <option>Large select</option>
                            <option>Large select</option>
                        </Form.Select>
                        <Form.Select className="dropdown-select">
                            <option value="" disabled selected hidden>Select Subcategory</option>
                            <option>Large select</option>
                        </Form.Select>
                    </div>
                    <div className="description">
                        <p className="description-tag">Description</p>
                        <textarea name="" id=""></textarea>
                        <p className="number-of-words">100 words (700 characters)</p>
                    </div>
                    <div className="drag-drop-field">
                        <div className="first-two">
                            <p className="upload-photos">Upload Photos</p>
                            <p className="or-just">or just drag and drop</p>
                        </div>
                        <p className="at-least-3-photos">(Add at least 3 photos)</p>
                    </div>
                </div>
            </div>
            <div className="buttons">
                <button onClick={handleCancelClick} className="cancel">CANCEL</button>
                <button onClick={handleNextClick}  className="next">NEXT</button>
            </div>
        </div>
    );
};