import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL

export async function fetchCategories () {
    return axios.get(`${apiUrl}/api/category`).then(res => {
        return res.data;
    });
}