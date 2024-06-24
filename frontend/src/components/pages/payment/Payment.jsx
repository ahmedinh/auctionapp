import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { getToken } from '../../utilities/Common';
const apiUrl = process.env.REACT_APP_API_URL

export default function Payment({ email, amount, productId, refetchBids }) {
    async function handleToken(token) {
        const userToken = getToken();
        await axios
            .post(`${apiUrl}/api/payment/charge`, "", {
                headers: {
                    token: token.id,
                    amount: amount,
                    'Authorization': `Bearer ${userToken}`
                },
                params: {
                    productId
                }
            })
            .then(() => {
                alert("Payment Success");
                refetchBids();
            })
            .catch((error) => {
                alert(error?.response?.data?.error_message);
            });
    }

    return (
        <StripeCheckout
            stripeKey="pk_test_51PDSFzP5kI1xofMU6sEdY2h6qzTVDpR9tkBKRbEUlY1cV7H6AmKQDuplplg1dX80tYpJicBuJs83F1FS4ci1ae4e007pNCyz4x"
            token={handleToken}
            email={email}
            amount={amount * 100}
        >
            <button className="payment">
                PAY
            </button>
        </StripeCheckout>
    );
}