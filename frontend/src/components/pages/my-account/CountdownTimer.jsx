import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ targetDate }) => {
    const [timeLeft, setTimeLeft] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const endDate = new Date(targetDate);
            const timeDiff = endDate - now;

            if (timeDiff > 0) {
                const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
                const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((timeDiff / 1000 / 60) % 60);

                let display = '';
                if (days >= 5) {
                    display = `${days} days`;
                } else if (days < 5 && days > 0) {
                    display = `${hours + (days * 24)} hours`;
                } else if (hours > 0) {
                    display = `${hours} hours`;
                } else if (minutes > 0) {
                    display = `${minutes} minutes`;
                }
                setTimeLeft(display);
            } else {
                clearInterval(interval);
                setTimeLeft('Time\'s up!');
            }
        }, 1000);

        return () => clearInterval(interval); // Cleanup the interval on component unmount
    }, [targetDate]);

    return (
        <div>
            <p>{timeLeft}</p>
        </div>
    );
};
export default CountdownTimer;