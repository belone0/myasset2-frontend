import axios from "axios";

const apiClient = axios.create({
    // baseURL: "http://localhost:3000",
    baseURL: "https://myasset2-backend.onrender.com",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
    withCredentials: true,
});

export default apiClient;
