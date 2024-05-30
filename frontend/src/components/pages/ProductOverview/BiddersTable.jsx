import React from 'react';
import './BiddersTable.scss';
import { useProductBidderTable } from '../../../hooks/productBidderTable';

export default function BiddersTable({ productId }) {
    const productBidders = useProductBidderTable({ productId });
    const formatDate = (dateString) => {
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-GB', options);
    };

    const productBiddersFlatMap = productBidders.data?.pages.flatMap(page => page.content);

    return (
        <div className="bidders-frame">
            <div className="headline">
                <h5 className='bidders-text'>Bidders</h5>
            </div>
            <div className="bidders-content">
                {(!productBidders.data || productBidders.data?.pages[0].empty) ? (
                    <h2>This product has no bids</h2>
                ) : (
                    <>
                        <table className="bidders-table">
                            <thead>
                                <tr>
                                    <th className='col1'>Bidder</th>
                                    <th className='col3'>Date</th>
                                    <th className='col4'>Bid</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productBiddersFlatMap.map((bid, index) => (
                                    <tr key={bid.id}>
                                        <td className='bidder'>
                                            <img src={bid.personPictureUrl} alt="" />
                                            <p>{bid.personFirstName} {bid.personLastName}</p>
                                        </td>
                                        <td className='bid-date'>{formatDate(bid.bidTimeStamp)}</td>
                                        <td className={index === 0 ? 'first-bid' : 'other-bid'}>${bid.bidAmount}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {productBidders.hasNextPage && (
                            <button className="explore-more-button" onClick={() => productBidders.fetchNextPage()} disabled={productBidders.isFetchingNextPage}>
                                {productBidders.isFetchingNextPage ? 'Loading...' : 'View more bidders'}
                            </button>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}