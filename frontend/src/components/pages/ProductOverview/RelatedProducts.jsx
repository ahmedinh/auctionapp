import React from "react";
import './RelatedProducts.scss';
import { NavLink } from "react-router-dom";

export default function RelatedProducts({ productData, headline, justifyContent }) {
    return (
        <div className="recommended">
            <div className="headline">
                <h5 className="featured-products" style={{ justifyContent: justifyContent }}>{headline}</h5>
                <hr />
            </div>
            <div className="products">
                {productData?.map(product => (
                    <div className="recommended-product" key={product.id}>
                        <NavLink to={`/shop/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <img src={product.url} alt={product.name} className='picture' />
                            <h5>{product.name}</h5>
                        </NavLink>
                        <p>Start from <span className="price">${product.startPrice.toFixed(2)}</span></p>
                    </div>
                ))}
            </div>
        </div>
    );
};