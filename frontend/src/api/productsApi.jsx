import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL

export async function fetchHighlight () {
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

export async function getProduct({ id }) {
    return axios.get(`${apiUrl}/api/product`, {
        params: { id }
    }).then(res => res.data);
}