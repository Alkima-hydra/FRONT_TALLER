import { createAsyncThunk } from '@reduxjs/toolkit';
import { personasApi } from '../../../lib/api';

//rutas que se ponen para cada cosa al momento de buscar
// en este caso las personas se tienen que buscar, primero en bautizo
// no tiene que estar dentro de sacramentos
export const fetchPersonas = createAsyncThunk(
  'personas/fetchPersonas',
  async (filters = {}, { rejectWithValue }) => {
    try {
      console.log('[personasThunk] Enviando filtros:', filters);
      const response = await personasApi.fetchPersonas(filters);
      console.log('[personasThunk] Respuesta del servidor:', response);
      console.log('[personasThunk] Personas obtenidas:', response.personas || response);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
