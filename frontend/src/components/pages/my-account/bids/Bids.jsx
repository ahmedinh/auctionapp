import React from 'react';
import { useNavigate } from 'react-router-dom';
import TableView from '../TableView';
import HammerPicture from '../../../../assets/hammer.svg';
import { useBids } from '../../../../hooks/useBids';
import LoadingSpinner from '../../../utilities/loading-spinner/LoadingSpinner';
import CountdownTimer from '../CountdownTimer';
import { newArrivalsRoute, shopPageRoute } from '../../../utilities/AppUrls';

export default function Bids() {
    const navigate = useNavigate();

    const {data, error, isError, isLoading, status} = useBids();

    if (isLoading)
        return <LoadingSpinner/>;

    const tableHeaders = ["Name", "Time left", "Your bid", "No. bids", "Highest bid", ""];

    const rowRenderer = (bid, index) => (
        <tr key={index}>
            <td className="col-s"><img src={bid.productPictureUrl} alt=""/></td>
            <td className="col1">
                <p>{bid.productName}</p>
                <p className="product-id">#{bid.productId}</p>
            </td>
            <td className="col1"><CountdownTimer targetDate={bid.auctionEnd}/></td>
            <td className="col1">${bid.userPrice.toFixed(2)}</td>
            <td className="col1">{bid.noOfBids}</td>
            <td className="col1">${bid.maxBid.toFixed(2)}</td>
            <td className="col1">
                <button onClick={() => navigate(shopPageRoute + `product/${bid.productId}`)}>
                    BID
                </button>
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