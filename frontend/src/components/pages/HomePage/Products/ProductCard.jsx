import React from 'react';
import { NavLink } from 'react-router-dom';
import "./ProductCard.scss";
import DollarSign from '../../../../assets/dollar-sign-2.png';

const ProductCard = ({ product, width, height, grid }) => {
    return (
        (grid ? (<div className="product" key={product.id} style={{ width: "267.45px" }}>
            <NavLink to={`/shop/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <img src={product.url} alt={product.name} className='picture' style={{ width: width, height: height }} />
                <h5>{product.name}</h5>
            </NavLink>
            <p>Start from <span className="price">${product.startPrice.toFixed(2)}</span></p>
        </div>) : (<div className="product-in-list">
            <img className='product-list-image' src={product.url} alt="" srcset="" />
            <div className="product-list-content">
                <div className="headline-and-description">
                    <h5 className="product-list-headline">{product.name}</h5>
                    <p className="product-list-description">{product.description}</p>
                </div>
                <p className="start-price">
                    Start from ${product.startPrice.toFixed(2)}
                </p>
                <button className="bid-button">
                    Bid <img src={DollarSign} alt="" />
                </button>
            </div>
        </div>))
    );
};
export default ProductCard;