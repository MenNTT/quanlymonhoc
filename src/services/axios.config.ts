import axios from 'axios';
import { BASE_URL } from '../constants/api/api.config';
import { cookieService } from '../services/cookie.service';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const token = cookieService.get('authToken') || localStorage.getItem('authToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance; 