import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginApi } from '../../../lib/api';

export const loginUser = createAsyncThunk(
  'login/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      console.log('[loginThunk] Enviando credenciales:', credentials);
      const response = await loginApi.login(credentials);
      console.log('[loginThunk] Respuesta del servidor:', response);

      return {
        name: response.nombre || response.usuario?.nombre || 'Usuario',
        email: response.email || response.usuario?.email || '',
        rol: response.rol || response.usuario?.role || 'Usuario',
        token: response.token,
      };
    } catch (error) {
      const errorMsg = error.message || 'Error al iniciar sesión';
      console.error('[loginThunk] Error:', errorMsg, error);
      return rejectWithValue(errorMsg);
    }
  }
);