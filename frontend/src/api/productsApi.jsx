import axios from "axios";
import { getToken } from "../components/utilities/Common";
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

export async function getProductsForCategory({ page, size = 9, categoryId, sortField, sortDirection }) {
    return axios.get(`${apiUrl}/api/product/all/category`, {
        params: { page, size, categoryId, sortField, sortDirection }
    }).then(res => res.data);
}

export async function searchProducts({ page, size, query, sortField, sortDirection }) {
    return axios.get(`${apiUrl}/api/product/search-products`, {
        params: { page, size, query, sortField, sortDirection }
    }).then(res => res.data);
};

export async function searchSuggestion({ query }) {
    return axios.get(`${apiUrl}/api/product/search-suggestion`, {
        params: { query }
    }).then(res => res.data);
};

export async function getActiveUserProducts({ userId }) {
    const userToken = getToken();
    return axios.get(`${apiUrl}/api/product/user/active`, {
        params: { userId },
        headers: {
            'Authorization': `Bearer ${userToken}`
        }
    }).then(res => res.data);
}

export async function getSoldUserProducts({ userId }) {
    const userToken = getToken();
    return axios.get(`${apiUrl}/api/product/user/sold`, {
        params: { userId },
        headers: {
            'Authorization': `Bearer ${userToken}`
        }
    }).then(res => res.data);
}

export async function createProduct({ productData }) {
    const userToken = getToken();
    console.log(productData);
    return axios.post(`${apiUrl}/api/product`, productData, {
        headers: {
            'Authorization': `Bearer ${userToken}`
        }
    }).then(res => res.data);
}

export async function addPicturesToProduct({ productPictures, productName }) {
    const userToken = getToken();
    const formData = new FormData();

    productPictures.forEach((file) => {
        formData.append('files', file);
        console.log(file);
    });

    return axios.post(`${apiUrl}/api/product/add-picture`, formData, {
        headers: {
            'Authorization': `Bearer ${userToken}`
        }, params: {
            productName
        }
    }).then(res => res.data);
}

export async function deleteProduct({ productName }) {
    const userToken = getToken();
    return axios.delete(`${apiUrl}/api/product/delete`, {
        headers: {
            'Authorization': `Bearer ${userToken}`
        },
        params: {
            productName
        }
    }).then(res => res.data);
}

export async function getRecommendedProducts(userId) {
    return axios.get(`${apiUrl}/api/product/recommended`, {
        params: {
            userId
        }
    }).then(res => res.data);
}

export async function getSimilarProducts(productId) {
    return axios.get(`${apiUrl}/api/product/similar`, {
        params: {
            productId
        }
    }).then(res => res.data);
}

export async function getProductBids({ productId, page }) {
    const userToken = getToken();
    return axios.get(`${apiUrl}/api/bid/product/all`, {
        headers: {
            'Authorization': `Bearer ${userToken}`
        },
        params: {
            productId,
            page
        }
    }).then(res => res.data)
}