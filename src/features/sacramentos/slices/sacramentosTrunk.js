import { createAsyncThunk } from '@reduxjs/toolkit';
import { sacramentosApi } from '../../../lib/api';

//rutas que se ponen para cada cosa al momento de buscar
// en este caso las personas se tienen que buscar, primero en bautizo
// no tiene que estar dentro de sacramentos

export const fetchPersonasParaSacramento = createAsyncThunk(
  'sacramentos/buscarPersonas',
  async (params, { rejectWithValue }) => {
    try {
      const response = await sacramentosApi.buscarPersonas(params);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);