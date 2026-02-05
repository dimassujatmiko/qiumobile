import apiClient from './apiClient';
export const menuService = {
    getCategories: async () => {
        const response = await apiClient.get('/api/mobile/categories');
        return response.data;
    },

    getItemsByCategory: async (categoryId: string) => {
        const response = await apiClient.get(`/api/mobile/menu?category=${categoryId}`);
        return response.data;
    },

    getAllItems: async () => {
        const response = await apiClient.get('/api/mobile/menu');
        return response.data;
    }
};
