import { createSlice } from '@reduxjs/toolkit';
import { loginUser } from './loginThunks';

const initialState = {
  user: {
    name: '',
    rol: '',
    email: '',
    token: null,
  },
  isLoading: false,
  error: null,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    logout(state) {
      state.user = { name: '', email: '', rol: '', token: null };
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        console.log('[loginSlice] Login pendiente...');
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.error = null;
        console.log('[loginSlice] Login exitoso:', action.payload);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || { message: 'Error desconocido' };
        console.error('[loginSlice] Error en login:', state.error);
      });
  },
});

export const { logout } = loginSlice.actions;

export const selectUser = (state) => state.login.user;
export const selectIsLoading = (state) => state.login.isLoading;
export const selectError = (state) => state.login.error;

export const loginReducer = loginSlice.reducer;

export default loginSlice.reducer;