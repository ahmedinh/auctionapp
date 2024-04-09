import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL

export async function fetchHighlight() {
    return axios.get(`${apiUrl}/api/product/highlight`).then(res => {
        return res.data;
    })
}

export async function getNewArrivals({ page, size = 8 }) {
    return axios.get(`${apiUrl}/api/product/all/new-arrivals`, {
        params: { page: page, size: size }
    }).then(res => {
        return res.data;
    });
}

export async function getLastChance({ page, size = 8 }) {
    return axios.get(`${apiUrl}/api/product/all/last-chance`, {
        params: { page: page, size: size }
    }).then(res => {
        return res.data;
    });
}

export async function getProduct({ productId }) {
    return axios.get(`${apiUrl}/api/product`, {
        params: { id: productId }
    }).then(res => res.data);
}

export async function getProductsForCategory({ page, size = 9, categoryId }) {
    return axios.get(`${apiUrl}/api/product/all/category`, {
        params: { page, size, categoryId }
    }).then(res => res.data);
}

export async function searchProducts({ page, size, query }) {
    return axios.get(`${apiUrl}/api/product/search-basic`, {
        params: { page, size, query }
    }).then(res => res.data);
};

export async function searchSuggestion({ query }) {
    return axios.get(`${apiUrl}/api/product/search-threshold`, {
        params: { query }
    }).then(res => res.data);
};