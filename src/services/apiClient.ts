import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

// Ganti URL ini dengan URL Next.js API Anda nanti (misal: https://qiuqiu-web.vercel.app)
export const BASE_URL = 'http://192.168.1.10:3000';

const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    timeout: 10000,
});

// Interceptor untuk menangani Token Auth
apiClient.interceptors.request.use(
    async (config) => {
        const token = await SecureStore.getItemAsync('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default apiClient;
