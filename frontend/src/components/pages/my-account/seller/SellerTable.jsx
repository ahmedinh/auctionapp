import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getUser } from "../../../utilities/Common";
import './SellerTable.scss';
import { useNavigate } from "react-router-dom";
import CartPicture from '../../../../assets/cart.png';
import CountdownTimer from "../CountdownTimer";

export default function SellerTable({ fetchProducts, queryString }) {
    const navigate = useNavigate();
    const user = getUser();
    const userId = user.id;

    const { data, error, isError, isLoading, status } = useQuery({
        queryKey: [queryString],
        queryFn: () => fetchProducts({ userId })
    })

    const handleProductRedirect = (productId) => {
        navigate(`/shop/product/${productId}`);
    }

    const renderNoProducts = () => {
        return (
            <div className="no-products">
                <div className="no-products-content">
                    <div className="cart-text">
                        <img src={CartPicture} alt="" />
                        <p className="message">You do not have any scheduled items for sale.</p>
                    </div>
                    <button onClick={() => navigate('/my-account/add-item/product-info')}>
                        START SELLING
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="table-view">
            <table class="table">
                <thead>
                    <th scope="col" className="col-s1">Item</th>
                    <th scope="col" className="col1">Name</th>
                    <th scope="col" className="col1">Time left</th>
                    <th scope="col" className="col1">Your price</th>
                    <th scope="col" className="col1">No. bids</th>
                    <th scope="col" className="col1">Highest bid</th>
                    <th scope="col" className="col1"></th>
                </thead>
                <tbody>
                    {data && data.length > 0 ? (
                        data?.map((product, index) => (
                            <tr key={index}>
                                <td className="col-s"><img src={product.url} alt="" srcset="" /></td>
                                <td className="col1">
                                    <p>{product.name}</p>
                                    <p className="product-id">#{product.id}</p>
                                </td>
                                <td className="col1"><CountdownTimer targetDate={product.auctionEnd} /></td>
                                <td className="col1">${product.startPrice.toFixed(2)}</td>
                                <td className="col1">{product.noOfBids}</td>
                                <td className="col1">${product.maxBid.toFixed(2)}</td>
                                <td className="col1">
                                    <button onClick={() => handleProductRedirect(product.id)}>
                                        VIEW
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : renderNoProducts()}
                </tbody>
            </table>
        </div>
    )
};