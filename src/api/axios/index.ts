import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://api.rozklad.org.ua/v2",
});

export default axiosInstance;