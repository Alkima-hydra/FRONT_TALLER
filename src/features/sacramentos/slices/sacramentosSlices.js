import { createSlice } from '@reduxjs/toolkit';
import {
  fetchPersonasParaSacramento  // búsqueda filtrada por rol sacramento
} from './sacramentosTrunk';

const initialState = {
  personas: [],          // paginado normal
  personasBusqueda: [],  // resultados del autocomplete sacramentos
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
      .addCase(fetchPersonasParaSacramento.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.personasBusqueda = []; // limpia resultados previos
      })
      .addCase(fetchPersonasParaSacramento.fulfilled, (state, action) => {
        state.isLoading = false;
        state.personasBusqueda = action.payload.personas; // lista filtrada por sacramento
      })
      .addCase(fetchPersonasParaSacramento.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Error al buscar personas';
      });
  },
});


export const {
  clearError,
  clearPersonaSeleccionada,
  resetPagination,
} = sacramentosSlice.actions;

export const selectPersonas = (state) => state.personas.personas;
export const selectPersonasBusqueda = (state) => state.personas.personasBusqueda;


export const selectIsLoading = (state) => state.personas.isLoading;
export const selectIsLoadingAll = (state) => state.personas.isLoadingAll;
export const selectIsLoadingById = (state) => state.personas.isLoadingById;
export const selectError = (state) => state.personas.error;
export const selectIsCreating = (state) => state.personas.isCreating;
export const selectIsUpdating = (state) => state.personas.isUpdating;
export const selectIsDeleting = (state) => state.personas.isDeleting;

export const sacramentosReducer = sacramentosSlice.reducer;
export default sacramentosSlice.reducer;