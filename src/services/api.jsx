import axios from "axios"

const headers = {
    "Content-Type": "application/json",
}

const api = axios.create({
    baseURL: "http://127.0.0.1:8000/",
})


export default async function dataFetch(endpoint, method = "GET", data = null, config = {}) {
    let token = localStorage.getItem("access")
    
    if (token && !headers["Authorization"]) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    try {
        const response = await api.request({
            url: endpoint,
            method,
            data,
            headers: headers,
            ...config,
        });
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
}

