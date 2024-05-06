import React, { useState, useEffect } from "react"
import "./Product.scss"
import { getProduct } from "../../../api/productsApi";
import { useParams } from "react-router-dom";
import BreadCrumbsMenu from "../../utilities/BreadCrumbsMenu";
import { useQuery } from "@tanstack/react-query";
import AuctionCountdown from "./AuctionCountdown";
import SockJS from "sockjs-client";
import Stomp from 'stompjs';
import { getToken, getUser, getUserId } from "../../utilities/Common";

export default function Product() {
    const apiUrl = process.env.REACT_APP_API_URL;
    const [stompClient, setStompClient] = useState(null);
    const [notification, setNotification] = useState('');
    let { productId } = useParams();
    const [acceptedBid, setAcceptedBid] = useState(0);
    const [newBid, setNewBid] = useState('');
    const [errorBid, setErrorBid] = useState('');
    const {
        status, data, error, refetch
    } = useQuery({
        queryKey: ['product', productId],
        queryFn: () => getProduct({ productId }),
    })
    const [mainImage, setMainImage] = useState(() => {
        if (data && data.productPictureList.length > 0) {
            return data.productPictureList[0];
        }
        return null;
    });

    useEffect(() => {
        const socket = new SockJS(`${apiUrl}/ws`);
        const client = Stomp.over(socket);

        client.connect({}, () => {
            client.subscribe('/topic/bids', (message) => {
                const receivedMessage = JSON.parse(message.body);
                if (receivedMessage.accepted === true) {
                    setNotification('Congrats! You are the highest bidder!');
                    setAcceptedBid(1);
                }
                else if (receivedMessage.accepted === false) {
                    setNotification('There are higher bids than yours. You could give a second try!')
                    setAcceptedBid(2);
                }
                refetch();
            });
        });

        setStompClient(client);

        return () => {
            if (client.connected)
                client.disconnect();
        }
    }, []);

    if (status === 'pending') {
        return <span>Loading...</span>
    }

    if (status === 'error') {
        return <span>Error: {error.message}</span>
    }

    const handleImageClick = (selectedImage) => {
        setMainImage(selectedImage);
    };

    const handleBid = () => {
        const bidPattern = /^\d+(\.\d{1,2})?$/;
        const parsedBid = parseFloat(newBid);
        if (bidPattern.test(newBid) && stompClient?.connected) {
            const bidTry = {
                userId: getUserId(),
                productId: productId,
                amount: parsedBid
            }
            stompClient.send('/app/bid', {}, JSON.stringify(bidTry));
            setErrorBid('');
        } else {
            console.error('Invalid bid amount or WebSocket connection is not established');
            if (!bidPattern.test(newBid))
                setErrorBid('Only numbers with max of 2 decimals are accepted.')
        }
    }

    const productImage = mainImage === null ? data?.productPictureList[0].url : mainImage?.url

    return (
        <div className="product-page">
            <BreadCrumbsMenu title={data.name} rightLink="shop/single-product" fontWeight={700} />
            {acceptedBid === 1 ? <p className="notification-text" style={{ color: "#417505" }}>{notification}</p> : (acceptedBid === 2 ? <p className="notification-text" style={{ color: "#AB944E" }}>{notification}</p> : null)}
            <div className="product">
                <div className="product-pictures">
                    <div className="main-image">
                        <img src={productImage} alt="" className="main-picture" />
                    </div>
                    <div className="preview-pictures">
                        {data?.productPictureList.map((img) => (
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
                        {(getUserId() && getUserId() !== data.person.id) ? (
                            <div className="place-bid">
                                <div className="upper">
                                    <input type="text"
                                        placeholder={'Enter $' + (data.numberOfBids === 0 ? data.startPrice : (data.largestBid > data.startPrice ? data.largestBid + 1 : data.startPrice + 1)) + ' or higher'}
                                        value={newBid}
                                        onChange={(e) => setNewBid(e.target.value)} />
                                    <button onClick={() => handleBid()}>PLACE BID</button>
                                </div>
                                {errorBid.length > 0 ? <p className="error-bid">{errorBid}</p> : null}
                            </div>
                        ) : (
                            null
                        )}
                    </div>
                    <div className="information">
                        <div className="tabs">
                            <div className="inner">
                                <div className="active">
                                    Details
                                </div>
                            </div>
                            <hr />
                        </div>
                        <div className="tab-content">
                            <p className="description">{data.description.replace(/\\n/g, '\n')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}