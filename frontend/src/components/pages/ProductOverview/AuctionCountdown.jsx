export const AuctionCountdown = (auctionEnd) => {
    const calculateTimeLeft = () => {
        const auctionEndDate = new Date(auctionEnd);
        const now = new Date();
        const difference = auctionEndDate - now;

        if (difference <= 0) {
            return "Time is up!";
        }

        return {
            weeks: Math.floor(difference / (1000 * 60 * 60 * 24 * 7)),
            days: Math.floor((difference / (1000 * 60 * 60 * 24)) % 7),
        };
    };

    const timeLeft = calculateTimeLeft();

    if (timeLeft === "Time is up!") {
        return "Time is up!";
    }

    return `${timeLeft.weeks || 0} weeks ${timeLeft.days || 0} days remaining`;
};