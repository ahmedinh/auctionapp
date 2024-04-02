import React from 'react';
import { NavLink } from 'react-router-dom';
import "./ProductCard.scss";

const ProductCard = ({ product }) => {
    return (
        <div className="product" key={product.id} style={{ width: "267.45px" }}>
            <NavLink to={`/shop/product/${product.id}/details`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <img src={product.url} alt={product.name} className='picture' />
                <h5>{product.name}</h5>
            </NavLink>
            <p>Start from <span className="price">${product.startPrice.toFixed(2)}</span></p>
        </div>
    );
};
export default ProductCard;