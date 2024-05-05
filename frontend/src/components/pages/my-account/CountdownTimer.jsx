import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ targetDate }) => {
    const [timeLeft, setTimeLeft] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            now.setHours(0, 0, 0, 0); // Reset time to start of the day
            const endDate = new Date(targetDate);
            endDate.setHours(23, 59, 59, 999); // Set time to end of the day

            const timeDiff = endDate - now;

            if (timeDiff >= 0) {
                const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
                if (days > 0) {
                    setTimeLeft(`${days} days`);
                } else {
                    // Calculate remaining hours and minutes for today
                    const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
                    const minutes = Math.floor((timeDiff / 1000 / 60) % 60);
                    if (hours > 0 || minutes > 0) {
                        setTimeLeft(`${hours} hours and ${minutes} minutes`);
                    } else {
                        setTimeLeft('Today');
                    }
                }
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
