import apiClient from './apiClient';

export const menuService = {
  // --- CATEGORY ---
  getMenuByRestaurant: async (restaurantId) => {
    return await apiClient.get(`/menus/restaurant/${restaurantId}`);
  },
  createCategory: async (data) => {
    return await apiClient.post('/menus/categories', data);
  },
  updateCategory: async (categoryId, data) => {
    return await apiClient.put(`/menus/categories/${categoryId}`, data);
  },
  deleteCategory: async (categoryId) => {
    return await apiClient.delete(`/menus/categories/${categoryId}`);
  },

  // --- MENU ITEM ---
  addMenuItem: async (categoryId, data) => {
    return await apiClient.post(`/menus/categories/${categoryId}/items`, data);
  },
  updateMenuItem: async (itemId, data) => {
    return await apiClient.put(`/menus/items/${itemId}`, data);
  },
  deleteMenuItem: async (itemId) => {
    return await apiClient.delete(`/menus/items/${itemId}`);
  }
};