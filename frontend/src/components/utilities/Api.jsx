export const fetchCategories = async () => {
    try {
        const response = await fetch('http://localhost:8086/api/category');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch categories: ", error);
        return [];
    }
}

export const fetchHighlight = async () => {
    try {
        const response = await fetch('http://localhost:8086/api/product/highlight');
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
        const response = await fetch(`http://localhost:8086/api/product/all/new-arrivals?page=${pageNum}&size=8`);
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

export const fetchLastChance = async () => {
    try {
        const response = await fetch('http://localhost:8086/api/product/all/last-chance');
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