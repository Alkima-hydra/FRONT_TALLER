import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    name: 'Admin',
    role: 'Administrador',
    avatar: 'https://lh3.googleusercontent.com/...', // Reemplazar con api lol
  },
  notifications: 1, // Borrar si matamos lo de notis
  isLoading: false,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setLoading(state) {
      state.isLoading = true;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
    setNotifications(state, action) {
      state.notifications = action.payload; // Borrar si matamos lo de notis
    },
  },
});

export const { setUser, setNotifications } = loginSlice.actions;
export const selectUser = (state) => state.login.user;
export const selectNotifications = (state) => state.login.notifications;
export const loginReducer = loginSlice.reducer;
export default loginSlice.reducer;