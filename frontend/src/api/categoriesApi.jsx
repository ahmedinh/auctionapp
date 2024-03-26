const apiUrl = process.env.REACT_APP_API_URL

export const fetchCategories = async () => {
    try {
        const response = await fetch(`${apiUrl}/api/category`);
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