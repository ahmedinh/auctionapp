import axios from "axios";
import { getToken } from "../components/utilities/Common";
const apiUrl = process.env.REACT_APP_API_URL

export async function changeUserInfo({ payload }) {
    const userToken = getToken();
    return axios.put(`${apiUrl}/api/user/current`, payload, {
        headers: {
            'Authorization': `Bearer ${userToken}`
        }
    }).then(res => res.data).catch(error => {
        console.error('Error updating user info:', error.response);
        throw error; // Rethrow after logging or handle as needed
    });
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

export async function changeUserPicture({file}) {
    const userToken = getToken();
    const formData = new FormData();
    formData.append('file', file);

    return axios.put(`${apiUrl}/api/user/picture`, formData, {
        headers: {
            'Authorization': `Bearer ${userToken}`
        }
    }).then(res => res.data)
      .catch(err => {
          console.error('Error uploading picture:', err);
          throw err;
      });
}

export async function getUserBids() {
    const userToken = getToken();
    return axios.get(`${apiUrl}/api/bid/user/all`, {
        headers: {
            'Authorization': `Bearer ${userToken}`
        }
    }).then(res => res.data);
}