import { createAsyncThunk } from '@reduxjs/toolkit';
import { personasApi } from '../../../lib/api';

export const fetchPersonas = createAsyncThunk(
  'personas/fetchPersonas',
  async (filters = {}, { rejectWithValue }) => {
    try {
      
      console.log('[personasThunk] Enviando filtros:', filters);
      const response = await personasApi.fetchPersonas(filters);
      console.log('[personasThunk] Respuesta del servidor:', response);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchAllPersonas = createAsyncThunk(
  'personas/fetchAllPersonas',
  async (_, { rejectWithValue }) => {
    try {
      const response = await personasApi.fetchAllPersonas();
      return response.personas || response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchPersonaById = createAsyncThunk(
  'personas/fetchPersonaById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await personasApi.fetchPersonaById(id);
      return response.persona || response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);