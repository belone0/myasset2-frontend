import axios from "axios";

const apiClient = axios.create({
    // baseURL: "http://localhost:3000",
    baseURL: "https://mysite-ke2r.onrender.com",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
    withCredentials: true,
});

export default apiClient;