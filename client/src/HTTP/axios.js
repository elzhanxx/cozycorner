import axios from 'axios';
import { getItemFromLocalStorage } from "@/utils/index.js";

const $bearer = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: true,
});

const $host = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: true,
});

$bearer.interceptors.request.use(
    (config) => {
        const tokenJson = getItemFromLocalStorage('token');
        if (tokenJson) {
            try {
                const token = JSON.parse(tokenJson);
                config.headers.Authorization = `Bearer ${token}`;
            } catch (e) {
                console.error('Error parsing token:', e);
                config.headers.Authorization = 'Bearer ';
            }
        } else {
            config.headers.Authorization = 'Bearer ';
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export {
    $bearer,
    $host
};
