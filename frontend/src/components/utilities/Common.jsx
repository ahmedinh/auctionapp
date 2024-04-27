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
}

export const validToken = () => {
    const token = getToken();
    if (token === null) {
        return false;
    }
//  const exp = decode(token, { complete: true }).payload.exp;
    const exp = jwtDecode(token).exp;
    return Date.now() < exp * 1000;
}