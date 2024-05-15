import React from "react";
import Stripe from "react-stripe-checkout";
import axios from "axios";

export default function Payment({ email }) {
    async function handleToken(token) {
        console.log(token);
        await axios
            .post("http://localhost:8086/api/payment/charge", "", {
                headers: {
                    token: token.id,
                    amount: 500,
                },
            })
            .then(() => {
                alert("Payment Success");
            })
            .catch((error) => {
                alert(error);
            });
    }

    return (
        <button className="payment">
            <Stripe
                stripeKey="pk_test_51PDSFzP5kI1xofMU6sEdY2h6qzTVDpR9tkBKRbEUlY1cV7H6AmKQDuplplg1dX80tYpJicBuJs83F1FS4ci1ae4e007pNCyz4x"
                token={handleToken}
                email={email}
            >PAY</Stripe>
        </button>
    );
}