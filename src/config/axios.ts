import _axios from "axios";
const axios = _axios.create({
    baseURL: process.env.NEXT_APP_BASE_API_URL,
});

export default axios;

axios.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    config.headers["Authorization"] = `Bearer ${token}`;
    return config;
});
