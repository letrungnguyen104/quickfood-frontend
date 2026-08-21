import apiClient from './apiClient';

export const authService = {
  login: async (credentials) => {
    return await apiClient.post('/auth/login', credentials);
  },

  register: async (data) => {
    return await apiClient.post('/auth/register', data);
  },
  
  verifyOtp: async (data) => {
    return await apiClient.post('/auth/verify-otp', data);
  },

  resendOtp: async (email) => {
    return await apiClient.post('/auth/resend-otp', { email });
  },

  googleLogin: async (idToken) => {
    return await apiClient.post('/auth/google', { idToken });
  },

  forgotPassword: async (data) => {
    return await apiClient.post('/auth/forgot-password', data);
  },

  resetPassword: async (data) => {
    return await apiClient.post('/auth/reset-password', data);
  }

};