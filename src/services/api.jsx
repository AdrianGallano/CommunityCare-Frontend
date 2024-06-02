import axios from "axios"

const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
    headers: {
        "Content-Type": "application/json",
    },
})


export default async function dataFetch(endpoint, method = "GET", data = null, config = {}) {
    try {
        const response = await api.request({
            url: endpoint,
            method,
            data,
            ...config,
        });
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
}

