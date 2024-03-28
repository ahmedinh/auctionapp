import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL

export const fetchHighlight = async () => {
    try {
        const response = await fetch(`${apiUrl}/api/product/highlight`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const simplifiedData = {
            id: data.id,
            name: data.name,
            description: data.description,
            start_price: data.startPrice,
            picture_url: data.productPictureList.length > 0 ? data.productPictureList[0].url : ""
        };
        return simplifiedData;
    } catch (error) {
        console.error("Failed to fetch highlight: ", error);
        return [];
    }
}

export function getNewArrivals({ page, size = 8 }) {
    return axios.get(`${apiUrl}/api/product/all/new-arrivals`, {
        params: { page: page, size: size }
    }).then(res => {
        return res.data;
    });
}

export function getLastChance({ page, size = 8 }) {
    return axios.get(`${apiUrl}/api/product/all/last-chance`, {
        params: { page: page, size: size }
    }).then(res => {
        return res.data;
    });
}