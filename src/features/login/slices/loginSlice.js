import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    name: 'Admin',
    role: 'Administrador',
    token: null,
  },
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
      state.isLoading = false;
    },
    logout(state) {
      state.user = { name: '', role: '', token: null };
      state.isLoading = false;
    },
  },
});

export const { setUser, logout, setLoading } = loginSlice.actions;

export const selectUser = (state) => state.login.user;
export const selectIsLoading = (state) => state.login.isLoading;

export const loginReducer = loginSlice.reducer;

export default loginSlice.reducer;