import React from 'react';
import { useNavigate } from 'react-router-dom';
import HammerPicture from '../../../../assets/hammer.svg';
import { useBids } from '../../../../hooks/useBids';
import LoadingSpinner from '../../../utilities/loading-spinner/LoadingSpinner';
import TableView from '../../../pages/my-account/TableView';
import { getUser } from '../../../utilities/Common';
import './Bids.scss';
import { newArrivalsRoute, shopPageRoute } from '../../../utilities/AppUrls';
import Payment from '../../payment/Payment';

export default function Bids() {
    const navigate = useNavigate();
    const userEmail = getUser().email;
    const { data, isLoading, status, refetch: refetchBids } = useBids();

    if (isLoading)
        return <LoadingSpinner />;

    const tableHeaders = ["Name", "Time left", "Your bid", "No. bids", "Highest bid", ""];

    const rowRenderer = (bid, index) => (
        <tr key={index}>
            <td className="col-s"><img src={bid.productPictureUrl} alt="" /></td>
            <td className="col1">
                <p>{bid.productName}</p>
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
                ) : (bid.timeLeft === 'Time is up!' ? (
                    <p>Auction ended</p>
                ) : (
                    <button onClick={() => navigate(shopPageRoute + `product/${bid.productId}`)}>
                        BID
                    </button>
                )))}
            </td>
        </tr>
    );

    return (
        <TableView
            data={data}
            fetchStatus={status}
            noItemsMessage="You don't have any bids and there are so many cool products available for sale."
            noItemsActionLabel="START BIDDING"
            noItemsRedirect={newArrivalsRoute}
            tableHeaders={tableHeaders}
            rowRenderer={rowRenderer}
            icon={HammerPicture}
        />
    );
}