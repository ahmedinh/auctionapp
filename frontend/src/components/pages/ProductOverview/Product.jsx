import React, { useEffect, useState } from "react"
import "./Product.scss"
import { getProduct } from "../../../api/productsApi";
import { NavLink, Outlet, useParams } from "react-router-dom";
import BreadCrumbsMenu from "../../utilities/BreadCrumbsMenu";
import { useQuery } from "@tanstack/react-query";
import AuctionCountdown from "./AuctionCountdown";
import ProductDetails from "./Details";

export default function Product() {
    let { productId } = useParams();
    const [activeComponent, setActiveComponent] = useState();
    const [ counter, setCounter ] = useState(0)
    const {
        status, data, error
    } = useQuery({
        queryKey: ['product', productId],
        queryFn: () => getProduct({ productId }),
    })
    const [mainImage, setMainImage] = useState(() => {
        if (data && data.productPictureList.length > 0) {
            return data.productPictureList[0];
        }
        return null;
    });

    if (status === 'pending') {
        return <span>Loading...</span>
    }

    if (status === 'error') {
        return <span>Error: {error.message}</span>
    }

    const handleImageClick = (selectedImage) => {
        setMainImage(selectedImage);
    };

    const detailsPath = `/shop/product/${data?.id}/details`;
    const sellerPath = `/shop/product/${data?.id}/seller-information`;
    const reviewPath = `/shop/product/${data?.id}/reviews`;

    return (
        <div className="product-page">
            <BreadCrumbsMenu title={data.name} rightLink="shop/single-product" fontWeight={700} />
            <div className="product">
                <div className="product-pictures">
                    <div className="main-image">
                        <img src={mainImage === null ? data?.productPictureList[0].url : mainImage?.url} alt="" className="main-picture" />
                    </div>
                    <div className="preview-pictures">
                        {data?.productPictureList.map((img) => (
                            <img
                                key={img.id}
                                src={img.url}
                                alt=""
                                className="preview-picture"
                                onClick={() => handleImageClick(img)}
                            />
                        ))}
                    </div>
                </div>
                <div className="product-info">
                    <div className="basics">
                        <div className="headline">
                            <p className="product-name">{data.name}</p>
                            <p className="start-price">Starts from <span className="price">${data.startPrice}</span></p>
                        </div>
                        <div className="bids">
                            <p>Highest bid: <span className="price">${data.largestBid}</span></p>
                            <p>Number of bids: <span className="price">{data.numberOfBids}</span></p>
                            <p>Time left: <span className="price"><AuctionCountdown auctionEnd={data.auctionEnd} /></span></p>
                        </div>
                    </div>
                    <div className="information">
                        <div className="tabs">
                            <div className="inner">
                                <NavLink to={detailsPath} className="link" activeClassName="active" onClick={() => { setActiveComponent(detailsPath); setCounter(1); }}>
                                    Details
                                </NavLink>
                                <NavLink to={sellerPath} className="link" activeClassName="active" onClick={() => { setActiveComponent(sellerPath); setCounter(1); }}>
                                    Seller information
                                </NavLink>
                                <NavLink to={reviewPath} className="link" activeClassName="active" onClick={() => { setActiveComponent(reviewPath); setCounter(1); }}>
                                    Customer reviews
                                </NavLink>
                            </div>
                            <hr />
                        </div>
                        <div className="tab-content">
                            {activeComponent === detailsPath || counter === 0 ? (<ProductDetails description={data.description} />) : null}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}