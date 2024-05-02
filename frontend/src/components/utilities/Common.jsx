import { jwtDecode } from "jwt-decode";

export const setSession = (user, token) => {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('user', JSON.stringify(user));
}

export const removeSession = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
};

export const getUser = () => {
    const user = sessionStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};

export const getToken = () => {
    return sessionStorage.getItem('token') || null;
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
    const token = sessionStorage.getItem("token");
    if (!token) return false;

    try {
        const decoded = jwtDecode(token);
        return decoded.role && decoded.role === "ROLE_USER";
    } catch (error) {
        console.error("Failed to decode JWT", error);
        return false;
    }
};