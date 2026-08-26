import apiClient from './apiClient';

export const mediaService = {
  uploadImage: async (file, folder = 'restaurants') => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);

    return await apiClient.post('/media/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
};