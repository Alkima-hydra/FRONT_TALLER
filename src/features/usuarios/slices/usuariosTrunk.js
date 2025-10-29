import { createAsyncThunk } from '@reduxjs/toolkit';
import { usuariosApi } from '../../../lib/api';

export const fetchUsuarios = createAsyncThunk(
  'usuarios/fetchUsuarios',
  async (filters = {}, { rejectWithValue }) => {
    try {
      console.log('[usuariosThunk] Enviando filtros:', filters);
      const response = await usuariosApi.fetchUsuarios(filters);
      console.log('[usuariosThunk] Respuesta del servidor:', response);
      console.log('[usuariosThunk] Usuarios obtenidos:', response.usuarios || response);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchAllUsuarios = createAsyncThunk(
  'usuarios/fetchAllUsuarios',
  async (_, { rejectWithValue }) => {
    try {
      const response = await usuariosApi.fetchAllUsuarios();
      return response.usuarios || response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchUsuarioById = createAsyncThunk(
  'usuarios/fetchUsuarioById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await usuariosApi.fetchUsuarioById(id);
      return response.usuario || response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createUsuario = createAsyncThunk(
  'usuarios/createUsuario',
  async (payload, { rejectWithValue }) => {
    try {
      console.log('[usuariosThunk] Creando usuario:', payload)
      const response = await usuariosApi.createUsuario(payload)
      console.log('[usuariosThunk] Usuario creado:', response)
      // Algunos backends devuelven { usuario }, otros el objeto directo
      return response?.usuario || response
    } catch (error) {
      console.error('[usuariosThunk] Error creando usuario:', error)
      return rejectWithValue(error?.response?.data || error.message || error)
    }
  }

)
export const updateUsuario = createAsyncThunk(
  'usuarios/updateUsuario',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      console.log('[usuariosThunk] Actualizando usuario:', id, data);
      const response = await usuariosApi.updateUsuario(id, data);
      console.log('[usuariosThunk] Usuario actualizado:', response);
      return response?.usuario || response;
    } catch (error) {
      console.error('[usuariosThunk] Error actualizando usuario:', error);
      return rejectWithValue(error?.response?.data || error.message || error);
    }
  }
);

export const deleteUsuario = createAsyncThunk(
  'usuarios/deleteUsuario',
  async (id, { rejectWithValue }) => {
    try {
      console.log('[usuariosThunk] Eliminando usuario ID:', id);
      const response = await usuariosApi.deleteUsuario(id);
      console.log('[usuariosThunk] Usuario eliminado:', response);
      return response?.usuario || response;
    } catch (error) {
      console.error('[usuariosThunk] Error eliminando usuario:', error);
      return rejectWithValue(error?.response?.data || error.message || error);  
    }
  }
);  