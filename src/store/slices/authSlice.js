import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: JSON.parse(localStorage.getItem('quickfood_user')) || null,
  token: localStorage.getItem('accessToken') || null,
  refreshToken: localStorage.getItem('refreshToken') || null,
  isAuthenticated: !!localStorage.getItem('accessToken'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, token, refreshToken } = action.payload;
      state.user = user;
      state.token = token;
      state.refreshToken = refreshToken;
      state.isAuthenticated = true;
      
      localStorage.setItem('quickfood_user', JSON.stringify(user));
      localStorage.setItem('accessToken', token);
      localStorage.setItem('refreshToken', refreshToken);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      
      localStorage.removeItem('quickfood_user');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    },
  }
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;