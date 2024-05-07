import React, { useState, useEffect } from 'react';

const AuctionCountdown = ({ auctionEnd }) => {
    const calculateTimeLeft = () => {
        const auctionEndDate = new Date(auctionEnd);
        const now = new Date();
        const difference = auctionEndDate - now;

        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                weeks: Math.floor(difference / (1000 * 60 * 60 * 24 * 7)),
                days: Math.floor((difference / (1000 * 60 * 60 * 24)) % 7),
            };
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timer);
    });

    return (
        <>
            {timeLeft.weeks || 0} weeks {timeLeft.days || 0} days remaining
        </>
    );
};
export default AuctionCountdown;