import apiClient from './apiClient';

export const orderService = {
    createOrder: async (payload) => {
        return await apiClient.post('/orders', payload);
    }
};