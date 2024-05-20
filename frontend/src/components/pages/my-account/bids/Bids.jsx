import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HammerPicture from '../../../../assets/hammer.svg';
import { useBids } from '../../../../hooks/useBids';
import LoadingSpinner from '../../../utilities/loading-spinner/LoadingSpinner';
import Payment from "../../payment/Payment";
import { getUser, getUserId } from '../../../utilities/Common';
import './Bids.scss';

export default function Bids() {
    const navigate = useNavigate();
    const userId = getUserId();
    const [auctionEnded, setAuctionEnded] = useState({});
    const userEmail = getUser().email;

    const handleTimeUp = (productId) => {
        setAuctionEnded(prev => ({ ...prev, [productId]: true }));
    };

    const handleProductRedirect = (productId) => {
        navigate(`/shop/product/${productId}`);
    }
    const { data, error, isError, isLoading, status, refetch: refetchBids } = useBids();

    if (isLoading)
        return <LoadingSpinner/>;

    const tableHeaders = ["Name", "Time left", "Your bid", "No. bids", "Highest bid", ""];

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
                    <th scope="col" className="col1"  style={{ marginRight: "15px" }}>Name</th>
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
                                <td className="col1"  style={{ marginRight: "15px" }}>
                                    <p className='product-name' onClick={() => handleProductRedirect(bid.productId)}>{bid.productName}</p>
                                    <p className="product-id">#{bid.productId}</p>
                                </td>
                                <td className="col1">{bid.timeLeft}</td>
                                <td className="col1">${bid.userPrice.toFixed(2)}</td>
                                <td className="col1">{bid.noOfBids}</td>
                                <td className="col1">${bid.maxBid.toFixed(2)}</td>
                                <td className="col1">
                                    {bid.timeLeft === 'Time is up!' && bid.maxBid === bid.userPrice && !bid.isPaid ? (
                                        <Payment email={userEmail} amount={bid.maxBid} productId={bid.productId} refetchBids={refetchBids} />
                                    ) : (bid.timeLeft === 'Time is up!' && bid.isPaid ? (
                                        <p>Product bought</p>
                                    ) :(bid.timeLeft === 'Time is up!' ? (
                                        <p>Auction ended</p>
                                    ) : (
                                        <button onClick={() => handleProductRedirect(bid.productId)}>BID</button>
                                    )))}
                                </td>
                            </tr>
                        ))
                    ) : renderNoProducts()}
                </tbody>
            </table>
        </div>
    );
}