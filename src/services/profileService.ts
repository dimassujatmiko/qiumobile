import apiClient from './apiClient';

export const profileService = {
    getProfile: async (memberId: string) => {
        const response = await apiClient.get(`/api/mobile/profile?memberId=${memberId}`);
        return response.data;
    },

    updateProfile: async (data: { memberId: string; name?: string; avatarUrl?: string; phone?: string }) => {
        const response = await apiClient.patch('/api/mobile/profile', data);
        return response.data;
    },

    getBottles: async (memberId: string) => {
        const response = await apiClient.get(`/api/mobile/bottles?memberId=${memberId}`);
        return response.data;
    }
};
