import axios from "axios";

const apiClient = axios.create({
    // baseURL: "http://localhost:30",
    baseURL: "http://144.22.172.99:82",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
    withCredentials: true,
});

export default apiClient;
