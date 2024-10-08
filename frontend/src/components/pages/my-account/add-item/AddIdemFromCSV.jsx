import React, { useRef, useState } from 'react';
import './AddItemFromCSV.scss';
import { useAddProductsFromCSV } from '../../../../hooks/addProductsFromCSV';
import LoadingSpinner from '../../../utilities/loading-spinner/LoadingSpinner';

export default function AddItemFromCSV() {
    const fileInputRef = useRef(null);
    const [uploadedCSV, setUploadedCSV] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { mutate: addProducts } = useAddProductsFromCSV(setError, setLoading);

    const handleFilesUpload = (files) => {
        const file = files[0];
        setUploadedCSV(file);
        fileInputRef.current.value = null;
        setError('');
    };

    const handleDrop = (event) => {
        event.preventDefault();
        handleFilesUpload(event.dataTransfer.files);
    };

    const handleDivClick = () => {
        fileInputRef.current.click();
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleFileInputChange = (event) => {
        handleFilesUpload(event.target.files);
    };

    const handleSubmit = () => {
        if (uploadedCSV) {
            addProducts(uploadedCSV);
        }
        else {
            alert('Add file first');
        }
    }

    return (
        <div className="csv-content">
            <h5>Add items using CSV</h5>
            <div
                className="drag-drop-field"
                onClick={handleDivClick}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
            >
                <input
                    type="file"
                    accept=".csv"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileInputChange}
                />
                <div className="first-two">
                    <p className="upload-photos">Upload CSV</p>
                    <p className="or-just">or just drag and drop</p>
                </div>
            </div>
            {uploadedCSV && !loading && (
                <>
                    <div className="file-name">
                        <p>Selected file: {uploadedCSV.name}</p>
                    </div>
                    <button className='upload-button' onClick={handleSubmit}>UPLOAD</button>
                </>
            )}
            {error && (
                <p className='error-message'>Error: {error.response?.data.error_message}</p>
            )}
            {loading && (
                <>
                    <LoadingSpinner />
                </>
            )}
        </div>
    );
}
