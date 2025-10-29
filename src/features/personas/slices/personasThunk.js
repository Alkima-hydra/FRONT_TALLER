import { createAsyncThunk } from '@reduxjs/toolkit';
import { personasApi, api } from '../../../lib/api';

export const fetchPersonas = createAsyncThunk(
  'personas/fetchPersonas',
  async (filters = {}, { rejectWithValue }) => {
    try {
      // Normalizar filtros: trim strings y eliminar vacíos
      const isNonEmpty = (v) => v !== null && v !== undefined && (typeof v !== 'string' || v.trim() !== '');
      const cleaned = Object.fromEntries(
        Object.entries(filters || {})
          .map(([k, v]) => [k, typeof v === 'string' ? v.trim() : v])
          .filter(([, v]) => isNonEmpty(v))
      );

      console.log('[personasThunk] Filtros limpiados:', cleaned);

      // Enviar como query params (GET) para que el backend filtre correctamente
      const resp = await api.get('/personas', { params: cleaned });
      const data = resp?.data ?? resp; // axios suele devolver .data
      console.log('[personasThunk] Respuesta del servidor:', data);

      // Unificar forma de retorno
      const personas = data?.personas || data?.items || data;
      console.log('[personasThunk] Personas obtenidas:', personas);
      return { personas, totalItems: data?.totalItems, totalPages: data?.totalPages, currentPage: data?.currentPage };
    } catch (error) {
      console.error('[personasThunk] Error fetchPersonas:', error);
      return rejectWithValue(error?.response?.data || error.message || error);
    }
  }
);

export const fetchAllPersonas = createAsyncThunk(
  'personas/fetchAllPersonas',
  async (_, { rejectWithValue }) => {
    try {
      const resp = await personasApi.fetchAllPersonas();
      const data = resp?.data ?? resp;
      return data?.personas || data?.items || data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error.message || error);
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
      return rejectWithValue(error?.response?.data || error.message || error);
    }
  }
);

export const createPersona = createAsyncThunk(
  'personas/createPersona',
  async (payload, { rejectWithValue }) => {
    try {
      console.log('[personasThunk] Creando persona:', payload)
      const response = await personasApi.createPersona(payload)
      console.log('[personasThunk] Persona creada:', response)
      // Algunos backends devuelven { persona }, otros el objeto directo
      return response?.persona || response
    } catch (error) {
      console.error('[personasThunk] Error creando persona:', error)
      return rejectWithValue(error?.response?.data || error.message || error)
    }
  }

)
export const updatePersona = createAsyncThunk(
  'personas/updatePersona',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      console.log('[personasThunk] Actualizando persona:', id, data);
      const response = await personasApi.updatePersona(id, data);
      console.log('[personasThunk] Persona actualizada:', response);
      return response?.persona || response;
    } catch (error) {
      console.error('[personasThunk] Error actualizando persona:', error);
      return rejectWithValue(error?.response?.data || error.message || error);
    }
  }
);

export const deletePersona = createAsyncThunk(
  'personas/deletePersona',
  async (id, { rejectWithValue }) => {
    try {
      console.log('[personasThunk] Eliminando persona ID:', id)
      const response = await personasApi.deletePersona(id)
      console.log('[personasThunk] Persona eliminada:', response)
      return response?.persona || response
    } catch (error) {
      console.error('[personasThunk] Error eliminando persona:', error)
      return rejectWithValue(error?.response?.data || error.message || error)
    }
  }
);  