export const fetchCategories = async () => {
    try {
        const response = await fetch('http://localhost:8086/api/category');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data; // Return the fetched data directly
    } catch (error) {
        console.error("Failed to fetch categories: ", error);
        return []; // Return an empty array in case of error
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
        return []; // Return an empty array in case of error
    }
}