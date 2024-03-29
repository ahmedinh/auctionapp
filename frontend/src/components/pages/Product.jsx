import React from "react"
import "./Product.scss"
import { getProduct } from "../../api/productsApi";
import { useParams } from "react-router-dom";
import BreadCrumbsMenu from "../utilities/BreadCrumbsMenu";
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
    if (status === 'pending') {
        return <span>Loading...</span>
    }

    if (status === 'error') {
        return <span>Error: {error.message}</span>
    }
    console.log(data);
    return (
        <div className="product-page">
            <BreadCrumbsMenu title={data.name} rightLink="shop/single-product" />
            <div className="product">
                <div className="product-pictures">
                    <img src={data.productPictureList[0].url} alt="" className="main-picture"/>
                </div>
                <div className="product-info">
                    <div className="basics">
                        <div className="headline">
                            <p className="product-name">{data.name}</p>
                            <p className="start-price">Starts from <span className="price">${data.startPrice}</span></p>
                        </div>
                        <div className="bids">
                            <p>Highest bid: <span className="price">{data.largestBid}</span></p>
                            <p>Number of bids: <span className="price">{data.numberOfBids}</span></p>
                            <p>Time left: <span className="price"><AuctionCountdown auctionEnd={data.auctionEnd}/></span></p>
                        </div>
                    </div>
                    <div className="details">
                    </div>
                </div>
            </div>
        </div>
    );
}