import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./ProductCard.scss";
import DollarSign from '../../../../assets/dollar-sign-2.png';

const ProductCard = ({ product, width, height, grid }) => {
    const navigate = useNavigate();
    const productLink = `/shop/product/${product.id}`;
    const sanitizedDescription = product.description.split('\\n').join('. ');
    return (
        (grid ? (
            <div className="product" key={product.id}>
                <div className='picture-and-name' onClick={() => navigate(productLink)} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <img src={product.url} alt={product.name} className='picture' style={{ width: width, height: height }} />
                    <h5>{product.name}</h5>
                </div>
                <p>Start from <span className="price">${product.startPrice.toFixed(2)}</span></p>
            </div>
        ) : (
            <div className="product-in-list">
                <img className='product-list-image' src={product.url} alt={product.name} onClick={() => navigate(productLink)} />
                <div className="product-list-content">
                    <div className="headline-and-description" onClick={() => navigate(productLink)}>
                        <h5>{product.name}</h5>
                        <p className="product-list-description">{sanitizedDescription}</p>
                    </div>
                    {product.highestBid ?
                        (<p className="start-price">Highest bid ${product.highestBid.toFixed(2)}</p>) :
                        (<p className="start-price">Start from ${product.startPrice.toFixed(2)}</p>)}
                    <button className="bid-button" onClick={() => navigate(productLink)}>
                        Bid <img src={DollarSign} alt="" />
                    </button>
                </div>
            </div>
        ))
    );
};
export default ProductCard;