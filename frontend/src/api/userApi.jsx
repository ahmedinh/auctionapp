import axios from "axios";
import { getToken, getUserId } from "../components/utilities/Common";
const apiUrl = process.env.REACT_APP_API_URL

export async function changeUserInfo({ payload }) {
    const userToken = getToken();
    return axios.put(`${apiUrl}/api/user/current`, payload, {
        headers: {
            'Authorization': `Bearer ${userToken}`
        }
    }).then(res => res.data);
}

export async function getUserInfo() {
    const userToken = getToken();
    return axios.get(`${apiUrl}/api/user/current`, {
        headers: {
            'Authorization': `Bearer ${userToken}`
        }
    }).then(res => res.data);
}

export async function getUserPicture() {
    const userToken = getToken();
    return axios.get(`${apiUrl}/api/user/picture`, {
        headers: {
            'Authorization': `Bearer ${userToken}`
        }
    }).then(res => res.data);
}

export async function changeUserPicture({ file }) {
    const userToken = getToken();
    const formData = new FormData();
    formData.append('file', file);
    return axios.put(`${apiUrl}/api/user/picture`, formData, {
        headers: {
            'Authorization': `Bearer ${userToken}`
        }
    }).then(res => res.data);
}

export async function getUserBids() {
    const userToken = getToken();
    return axios.get(`${apiUrl}/api/bid/user/all`, {
        headers: {
            'Authorization': `Bearer ${userToken}`
        }
    }).then(res => res.data);
}

export async function getUserPhoneNumber() {
    const userId = getUserId();
    const userToken = getToken();
    return axios.get(`${apiUrl}/api/user/phone-number`, {
        params: {
            userId
        },
        headers: {
            'Authorization': `Bearer ${userToken}`
        }
    }).then(res => res.data);
}

export async function deactivateUserAccount() {
    const userToken = getToken();
    return axios.patch(`${apiUrl}/api/user/deactivate`, {}, {
        headers: {
            'Authorization': `Bearer ${userToken}`
        }
    }).then(res => res.data);
}