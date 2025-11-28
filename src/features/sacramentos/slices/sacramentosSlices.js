import { createSlice } from '@reduxjs/toolkit';
import {
  fetchPersonas,
} from './sacramentosTrunk';

const initialState = {
  personas: [],
  totalItems: 0,
  totalPages: 1,
  currentPage: 1,

  allPersonas: [],
  personaSeleccionada: null,

  isLoading: false,
  isLoadingAll: false,
  isLoadingById: false,
  isCreating: false,
  isUpdating: false,
  isDeleting: false,
  error: null,
};

const sacramentosSlice = createSlice({
  name: 'sacramentos',
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
    //persona por la parte de buscar al verificar
    clearPersonaSeleccionada(state) {
      state.personaSeleccionada = null;
    },
    resetPagination(state) {
      state.personas = [];
      state.totalItems = 0;
      state.totalPages = 1;
      state.currentPage = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchPersonas (paginado)
      .addCase(fetchPersonas.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPersonas.fulfilled, (state, action) => {
        state.isLoading = false;
        state.personas = action.payload.personas;
        state.totalItems = action.payload.totalItems;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(fetchPersonas.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || 'Error al cargar personas';
      })

  },
});

// Acciones síncronas
export const { clearError, clearPersonaSeleccionada, resetPagination } = sacramentosSlice.actions;

// Selectores
export const selectPersonas = (state) => state.personas.personas;

// Para loading maybe borrar si no tiene la wea esa que gira al cargar
export const selectIsLoading = (state) => state.personas.isLoading;
export const selectIsLoadingAll = (state) => state.personas.isLoadingAll;
export const selectIsLoadingById = (state) => state.personas.isLoadingById;
export const selectError = (state) => state.personas.error;
export const selectIsCreating = (state) => state.personas.isCreating;
export const selectIsUpdating = (state) => state.personas.isUpdating;
export const selectIsDeleting = (state) => state.personas.isDeleting;

// Exportar reducer
export const sacramentosReducer = sacramentosSlice.reducer;
export default sacramentosSlice.reducer;