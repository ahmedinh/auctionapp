import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TableView.scss';

const TableView = ({
    data,
    fetchStatus,
    noItemsMessage,
    noItemsActionLabel,
    noItemsRedirect,
    tableHeaders,
    rowRenderer,
    icon
}) => {
    const navigate = useNavigate();

    const handleRedirect = (path) => {
        navigate(path);
    };

    const renderNoItems = () => {
        return (
            <div className="no-products">
                <div className="no-products-content">
                    <div className="cart-text">
                        <img src={icon} alt="" />
                        <p className="message">{noItemsMessage}</p>
                    </div>
                    <button onClick={() => handleRedirect(noItemsRedirect)}>
                        {noItemsActionLabel}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="table-view">
            <table className="table">
                <thead>
                    <tr>
                        <th key="1" scope="col" className="col-s1">Item</th>
                        {tableHeaders.map((header, index) => (
                            <th key={index} scope="col" className="col1">{header}</th>
                        ))}
                    </tr>
                </thead>
                {fetchStatus === 'success' && data && data.length > 0 ? (
                    <tbody>
                        {data.map((item, index) => rowRenderer(item, index))}
                    </tbody>
                ) : renderNoItems()}
            </table>
        </div>
    );
};

export default TableView;