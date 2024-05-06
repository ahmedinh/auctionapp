import { jwtDecode } from "jwt-decode";

export const setSession = (user, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
}

export const removeSession = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
};

export const getUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};

export const getToken = () => {
    return localStorage.getItem('token') || null;
};

export const clearSessionStorageProduct = () => {
    sessionStorage.removeItem('productInfo')
    sessionStorage.removeItem('productPriceData')
    sessionStorage.removeItem('locationShipping')
};

export const getUserId = () => {
    const user = getUser();
    return user ? user.id : null;
}

export const validToken = () => {
    const token = getToken();
    if (token === null) {
        return false;
    }
    const exp = jwtDecode(token).exp;
    return Date.now() < exp * 1000;
}

export const isUserAuthorized = () => {
    const token = localStorage.getItem("token");
    if (!token) return false;

    try {
        const decoded = jwtDecode(token);
        return decoded.role && decoded.role === "ROLE_USER";
    } catch (error) {
        console.error("Failed to decode JWT", error);
        return false;
    }
};

const bubbleSort = (products, comparator) => {
    const sortedProducts = [...products];
    let n = sortedProducts.length;
    let swapped;

    for (let i = 0; i < n - 1; i++) {
        swapped = false;

        for (let j = 0; j < n - i - 1; j++) {
            if (comparator(sortedProducts[j], sortedProducts[j + 1])) {
                [sortedProducts[j], sortedProducts[j + 1]] = [sortedProducts[j + 1], sortedProducts[j]];
                swapped = true;
            }
        }

        if (!swapped) break;
    }

    return sortedProducts;
};

export const sortProducts = (criteria, products) => {
    switch (criteria) {
        case 'AUCTION_END':
            return bubbleSort(products, (a, b) => new Date(a.auctionEnd) > new Date(b.auctionEnd));
        case 'CREATED_AT':
            return bubbleSort(products, (a, b) => new Date(a.createdAt) > new Date(b.createdAt));
        case 'START_PRICE_HIGH_TO_LOW':
            return bubbleSort(products, (a, b) => a.startPrice < b.startPrice);
        case 'START_PRICE_LOW_TO_HIGH':
            return bubbleSort(products, (a, b) => a.startPrice > b.startPrice);
        default:
            return bubbleSort(products, (a, b) => a.name.localeCompare(b.name) > 0);
    }
}