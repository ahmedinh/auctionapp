const apiUrl = process.env.REACT_APP_API_URL

export const fetchHighlight = async () => {
    try {
        const response = await fetch(`${apiUrl}/api/product/highlight`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch highlight: ", error);
        return [];
    }
}

export const fetchNewArrivals = async (pageNum) => {
    try {
        const response = await fetch(`${apiUrl}/api/product/all/new-arrivals?page=${pageNum}&size=8`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch highlight: ", error);
        return [];
    }
}

export const fetchLastChance = async (pageNum) => {
    try {
        const response = await fetch(`${apiUrl}/api/product/all/last-chance?page=${pageNum}&size=8`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch highlight: ", error);
        return [];
    }
}