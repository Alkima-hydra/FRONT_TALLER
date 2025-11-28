import { createAsyncThunk } from '@reduxjs/toolkit';
import { sacramentosApi } from '../../../lib/api';
import { parroquiasApi } from '../../../lib/api';


//rutas que se ponen para cada cosa al momento de buscar
// en este caso las personas se tienen que buscar, primero en bautizo
// no tiene que estar dentro de sacramentos

export const fetchPersonasParaSacramento = createAsyncThunk(
  'sacramentos/buscarPersonas',
  async ({ search, tipo, rol }, { rejectWithValue }) => {
    try {
      const response = await sacramentosApi.buscarPersonas({
        search,
        tipo,
        rol,
      });

      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

//  Obtener parroquias con paginación o filtros
export const fetchParroquias = createAsyncThunk(
  'parroquias/fetchParroquias',
  async (filters = {}, { rejectWithValue }) => {
    try {
      console.log('[parroquiasThunk] Enviando filtros:', filters);
      const response = await parroquiasApi.fetchParroquias(filters);
      console.log('[parroquiasThunk] Respuesta del servidor:', response.parroquias);

      // 🔸 Si el backend devuelve { parroquias: [...], ok: true, currentPage: 1, ... }
      // devolvemos solo los campos útiles que usará el slice
      return {
        parroquias: response.parroquias || [],
        totalItems: response.totalItems || response.parroquias?.length || 0,
        totalPages: response.totalPages || 1,
        currentPage: response.currentPage || 1,
      };
    } catch (error) {
      console.error('[parroquiasThunk] Error:', error);
      return rejectWithValue(error?.response?.data || { message: 'Error en la carga de parroquias' });
    }
  }
);