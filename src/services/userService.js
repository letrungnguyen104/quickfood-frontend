import apiClient from './apiClient';

export const userService = {
  getProfile: async (email) => {
    return await apiClient.get(`/users/${email}`);
  },
  createProfile: async (payload) => {
    return await apiClient.post('/users', payload);
  },
  updateProfile: async (email, payload) => {
    return await apiClient.put(`/users/${email}`, payload);
  },
  getAddresses: async (email) => {
    return await apiClient.get(`/users/${email}/addresses`);
  },
  addAddress: async (email, payload) => {
    return await apiClient.post(`/users/${email}/addresses`, payload);
  }
};