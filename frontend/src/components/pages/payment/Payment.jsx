import React from "react";
import Stripe from "react-stripe-checkout";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

export default function Payment({ email, amount, productId }) {
    async function handleToken(token) {
        console.log(token);
        await axios
            .post("http://localhost:8086/api/payment/charge", "", {
                headers: {
                    token: token.id,
                    amount: amount,
                },
                params: {
                    productId
                }
            })
            .then(() => {
                alert("Payment Success");
            })
            .catch((error) => {
                alert(error?.response?.data?.error_message);
            });
    }

    return (
        <button className="payment">
            <StripeCheckout
                stripeKey="pk_test_51PDSFzP5kI1xofMU6sEdY2h6qzTVDpR9tkBKRbEUlY1cV7H6AmKQDuplplg1dX80tYpJicBuJs83F1FS4ci1ae4e007pNCyz4x"
                token={handleToken}
                email={email}
            >PAY</StripeCheckout>
        </button>
    );
}