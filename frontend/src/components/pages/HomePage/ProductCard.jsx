import React from 'react';
import { NavLink } from 'react-router-dom';
import "./ProductCard.scss";

const ProductCard = ({ product }) => {
    return (
        <div className="product" key={product.id}>
            <NavLink to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <img src={product.picture_url} alt={product.name} />
                <h5>{product.name}</h5>
            </NavLink>
            <p>Start from <span className="price">${product.start_price.toFixed(2)}</span></p>
        </div>
    );
};
export default ProductCard;