import apiClient from './apiClient';
export const eventService = {
    getEvents: async () => {
        const response = await apiClient.get('/api/mobile/events');
        return response.data; // Expected format: { success: true, data: [...] }
    },

    getEventById: async (id: string) => {
        const response = await apiClient.get(`/api/mobile/events/${id}`);
        return response.data;
    }
};
