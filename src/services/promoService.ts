import apiClient from './apiClient';

export const promoService = {
    getPromotions: async () => {
        const response = await apiClient.get('/api/mobile/promotions');
        return response.data;
    },

    validateVoucher: async (code: string) => {
        const response = await apiClient.post('/api/mobile/promotions', { code });
        return response.data;
    }
};
