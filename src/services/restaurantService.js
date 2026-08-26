import apiClient from './apiClient';

export const restaurantService = {
  getAllRestaurants: async () => {
    return await apiClient.get('/restaurants');
  },
  getRestaurantById: async (id) => {
    return await apiClient.get(`/restaurants/${id}`);
  },
  createRestaurant: async (data) => {
    return await apiClient.post('/restaurants', data);
  },
  updateRestaurant: async (id, data) => {
    return await apiClient.put(`/restaurants/${id}`, data);
  },
  getMyRestaurant: async (email) => {
    return await apiClient.get(`/restaurants/my-restaurant?email=${email}`);
  },
};