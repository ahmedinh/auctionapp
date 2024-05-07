import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL

export const login = async ({ email, password }) => {
    const response = await axios.post(`${apiUrl}/api/user/login`, { email, password });
    return response.data;
};

export const register = async ({ firstName, lastName, email, password }) => {
    const response = await axios.post(`${apiUrl}/api/user/register`, { firstName, lastName, email, password });
    return response.data;
};
