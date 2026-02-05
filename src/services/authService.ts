import apiClient from './apiClient';

export const authService = {
    login: async (email: string, password: string) => {
        const response = await apiClient.post('/api/mobile/auth/login', { email, password });
        return response.data; // Mengembalikan { success, data: { session, user } }
    },

    register: async (userData: { name: string; email: string; phone: string; password: string }) => {
        const response = await apiClient.post('/api/mobile/auth/register', userData);
        return response.data; // Mengembalikan { success, data: { user }, message }
    }
};
