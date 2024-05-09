import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getUser, getToken } from '../../../utilities/Common';
import TableView from '../TableView';
import CartPicture from '../../../../assets/cart.png';
import CountdownTimer from '../CountdownTimer';
import { useNavigate } from 'react-router-dom';
import { useSellerProducts } from '../../../../hooks/useSellerProducts';
import LoadingSpinner from '../../../utilities/loading-spinner/LoadingSpinner';

export default function SellerTable({ fetchProducts, queryString }) {
    const navigate = useNavigate();
    const user = getUser();
    const userId = user.id;

    const { data, error, isError, isLoading, status } = useSellerProducts({ fetchProducts, queryString, userId });

    if (status === 'pending' || status === 'loading')
        return <LoadingSpinner/>;

    const tableHeaders = ["Name", "Time left", "Your price", "No. bids", "Highest bid", ""];

    const rowRenderer = (product, index) => (
        <tr key={index}>
            <td className="col-s"><img src={product.url} /></td>
            <td className="col1">
                <p>{product.name}</p>
                <p className="product-id">#{product.id}</p>
            </td>
            <td className="col1"><CountdownTimer targetDate={product.auctionEnd} /></td>
            <td className="col1">${product.startPrice.toFixed(2)}</td>
            <td className="col1">{product.noOfBids}</td>
            <td className="col1">${product.maxBid.toFixed(2)}</td>
            <td className="col1">
                <button onClick={() => navigate(`/shop/product/${product.id}`)}>
                    VIEW
                </button>
            </td>
        </tr>
    );

    return (
        <TableView
            data={data}
            fetchStatus={status}
            noItemsMessage="You do not have any scheduled items for sale."
            noItemsActionLabel="START SELLING"
            noItemsRedirect="/my-account/add-item/product-info"
            tableHeaders={tableHeaders}
            rowRenderer={rowRenderer}
            icon={CartPicture}
        />
    );
}