import React, { useState } from "react"
import "./Product.scss"
import { getProduct } from "../../../api/productsApi";
import { NavLink, useParams } from "react-router-dom";
import BreadCrumbsMenu from "../../utilities/BreadCrumbsMenu";
import { useQuery } from "@tanstack/react-query";
import AuctionCountdown from "./AuctionCountdown";

export default function Product() {
    let { id } = useParams();
    const {
        status, data, error
    } = useQuery({
        queryKey: ['product', id],
        queryFn: () => getProduct({ id }),
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
                        {data?.productPictureList.filter(img => img.id !== (mainImage === null ? data?.productPictureList[0].id : mainImage.id)).map((img) => (
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
                                <NavLink to={detailsPath} className="link" activeClassName="active">
                                    Details
                                </NavLink>
                                <NavLink to={sellerPath} className="link" activeClassName="active">
                                    Seller information
                                </NavLink>
                                <NavLink to={reviewPath} className="link" activeClassName="active">
                                    Customer reviews
                                </NavLink>
                            </div>
                            <hr />
                        </div>
                        <div className="tab-content">
                            <p className="description">{data.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}