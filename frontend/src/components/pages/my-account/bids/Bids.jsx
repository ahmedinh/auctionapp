import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { getUserBids } from "../../../../api/userApi";
import { useNavigate } from "react-router-dom";
import '../seller/SellerTable.scss';
import './Bids.scss';
import HammerPicture from '../../../../assets/hammer.svg';
import Payment from "../../payment/Payment";
import { getUser, getUserId } from "../../../utilities/Common";


export default function Bids() {
    const navigate = useNavigate();
    const userId = getUserId();
    const [auctionEnded, setAuctionEnded] = useState({});
    const userEmail = getUser().email;

    const { data, error, isError, isLoading, status } = useQuery({
        queryKey: ['get-user-bids', userId],
        queryFn: () => getUserBids()
    })

    const handleTimeUp = (productId) => {
        setAuctionEnded(prev => ({ ...prev, [productId]: true }));
    };

    const handleProductRedirect = (productId) => {
        navigate(`/shop/product/${productId}`);
    }

    const renderNoProducts = () => {
        return (
            <div className="no-products">
                <div className="no-products-content">
                    <div className="cart-text">
                        <img src={HammerPicture} alt="" />
                        <p className="message">You don't have any bids and there are so many cool products available for sale.</p>
                    </div>
                    <button onClick={() => navigate('/home/new-arrivals')}>
                        START BIDDING
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
                    <th scope="col" className="col1">Your bid</th>
                    <th scope="col" className="col1">No. bids</th>
                    <th scope="col" className="col1">Highest bid</th>
                    <th scope="col" className="col1"></th>
                </thead>
                <tbody>
                    {data && data.length > 0 ? (
                        data?.map((bid, index) => (
                            <tr key={index}>
                                <td className="col-s"><img src={bid.productPictureUrl} alt="" srcset="" /></td>
                                <td className="col1">
                                    <p>{bid.productName}</p>
                                    <p className="product-id">#{bid.id}</p>
                                </td>
                                <td className="col1">{bid.timeLeft}</td>
                                <td className="col1">${bid.userPrice.toFixed(2)}</td>
                                <td className="col1">{bid.noOfBids}</td>
                                <td className="col1">${bid.maxBid.toFixed(2)}</td>
                                <td className="col1">
                                    {bid.timeLeft === 'Time is up!' && bid.maxBid === bid.userPrice ? (
                                        <Payment email={userEmail}/>
                                    ) : (bid.timeLeft === 'Time is up!' ? (
                                        <p>Auction ended</p>
                                    ) : (
                                        <button onClick={() => handleProductRedirect(bid.id)}>BID</button>
                                    ))}
                                </td>
                            </tr>
                        ))
                    ) : renderNoProducts()}
                </tbody>
            </table>
        </div>
    )
};