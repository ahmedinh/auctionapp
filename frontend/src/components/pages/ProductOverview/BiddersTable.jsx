import React from 'react';
import './BiddersTable.scss';
import { useProductBidderTable } from '../../../hooks/productBidderTable';

export default function BiddersTable({ productId }) {
    const productBidders = useProductBidderTable({ productId });
    console.log(productBidders.data)
    return (
        <div className="bidders-content">
            <div className="headline">
                <h5 className='bidders-text'>Bidders</h5>
                <hr />
            </div>
            <div className="bidders-content">
                <div className="bidders-table">
                    {productBidders.data?.pages.flatMap(page => page.content).map(bid => (
                        <p>{bid.personFirstName}</p>
                    ))}
                </div>
                {productBidders.hasNextPage && (
                    <button className="explore-more-button" onClick={() => productBidders.fetchNextPage()} disabled={productBidders.isFetchingNextPage}>
                        {productBidders.isFetchingNextPage ? 'Loading...' : 'Explore More'}
                    </button>
                )}
            </div>
        </div>
    );
}