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
};

export const validToken = () => {
    const token = getToken();
    if (token === null) {
        return false;
    }
    const exp = jwtDecode(token).exp;
    return Date.now() < exp * 1000;
};

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

export function isDateValid(day, month, year) {
    if (!day && !month && !year) {
        return true;
    }
    else if (!day || !month || !year) {
        return false;
    }

    const yearNum = parseInt(year, 10);
    const monthNum = parseInt(month, 10) - 1;
    const dayNum = parseInt(day, 10);

    if (yearNum < 1850 || yearNum > 3000 || monthNum < 0 || monthNum > 11) {
        return false;
    }

    const date = new Date(yearNum, monthNum, dayNum);
    if (date.getFullYear() !== yearNum || date.getMonth() !== monthNum || date.getDate() !== dayNum) {
        return false;
    }

    return true;
};

export const validateExpirationDate = (expirationMonth, expirationYear) => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100; // last two digits
    const currentMonth = currentDate.getMonth() + 1;
    const expMonth = parseInt(expirationMonth);
    const expYear = parseInt(expirationYear);

    if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
        return false;
    }
    return expMonth >= 1 && expMonth <= 12;
};