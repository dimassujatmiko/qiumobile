import apiClient from './apiClient';

export interface BookingData {
    type: 'KTV' | 'LOUNGE';
    roomId: string;
    date: string;
    time: string;
    guests: number;
    userId: string;
}

export const bookingService = {
    createBooking: async (bookingData: BookingData) => {
        const response = await apiClient.post('/api/mobile/bookings', bookingData);
        return response.data;
    },

    getBookingHistory: async (userId: string) => {
        const response = await apiClient.get(`/api/mobile/bookings/user/${userId}`);
        return response.data;
    },

    getRooms: async (type?: 'KTV' | 'TABLE') => {
        const response = await apiClient.get(`/api/mobile/rooms${type ? `?type=${type}` : ''}`);
        return response.data;
    }
};
