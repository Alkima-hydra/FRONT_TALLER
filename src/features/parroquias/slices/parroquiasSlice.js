import { createSlice } from '@reduxjs/toolkit';
import {
  fetchParroquias,
  fetchAllParroquias,
  fetchParroquiaById,
  createParroquia,
  updateParroquia,
} from './parroquiasThunk';

const initialState = {
  parroquias: [],
  totalItems: 0,
  totalPages: 1,
  currentPage: 1,

  allParroquias: [],
  parroquiaSeleccionada: null,

  isLoading: false,
  isLoadingAll: false,
  isLoadingById: false,
  isSaving: false,
  error: null,
};

const parroquiasSlice = createSlice({
  name: 'parroquias',
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
    setParroquiaSeleccionada: (state, action) => {
      state.parroquiaSeleccionada = action.payload;
    },
    clearParroquiaSeleccionada(state) {
      state.parroquiaSeleccionada = null;
    },
    resetPagination(state) {
      state.parroquias = [];
      state.totalItems = 0;
      state.totalPages = 1;
      state.currentPage = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchParroquias (paginado)
      .addCase(fetchParroquias.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchParroquias.fulfilled, (state, action) => {
        state.isLoading = false;
        state.parroquias = action.payload.parroquias || [];
        state.totalItems = action.payload.totalItems || 0;
        state.totalPages = action.payload.totalPages || 1;
        state.currentPage = action.payload.currentPage || 1;
      })
      .addCase(fetchParroquias.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || 'Error al cargar parroquias';
        state.parroquias = [];
      })

      // 🔹 fetchAllParroquias
      .addCase(fetchAllParroquias.pending, (state) => {
        state.isLoadingAll = true;
        state.error = null;
      })
      .addCase(fetchAllParroquias.fulfilled, (state, action) => {
        state.isLoadingAll = false;
        state.allParroquias = action.payload;
      })
      .addCase(fetchAllParroquias.rejected, (state, action) => {
        state.isLoadingAll = false;
        state.error = action.payload?.message || 'Error al cargar todas las parroquias';
      })

      // 🔹 fetchParroquiaById
      .addCase(fetchParroquiaById.pending, (state) => {
        state.isLoadingById = true;
        state.error = null;
      })
      .addCase(fetchParroquiaById.fulfilled, (state, action) => {
        state.isLoadingById = false;
        state.parroquiaSeleccionada = action.payload;
      })
      .addCase(fetchParroquiaById.rejected, (state, action) => {
        state.isLoadingById = false;
        state.error = action.payload?.message || 'Error al cargar la parroquia';
      })

      //  createParroquia
      .addCase(createParroquia.pending, (state) => {
        state.isSaving = true;
        state.error = null;
      })
      .addCase(createParroquia.fulfilled, (state, action) => {
        state.isSaving = false;
        state.parroquias.push(action.payload);
      })
      .addCase(createParroquia.rejected, (state, action) => {
        state.isSaving = false;
        state.error = action.payload?.message || 'Error al crear parroquia';
      })

      // updateParroquia
      .addCase(updateParroquia.pending, (state) => {
        state.isSaving = true;
        state.error = null;
      })
      .addCase(updateParroquia.fulfilled, (state, action) => {
        state.isSaving = false;
        const index = state.parroquias.findIndex(p => p.id === action.payload.id);
        if (index !== -1) state.parroquias[index] = action.payload;
      })
      .addCase(updateParroquia.rejected, (state, action) => {
        state.isSaving = false;
        state.error = action.payload?.message || 'Error al actualizar parroquia';
      });
  },
});

// Acciones sincronas
export const { clearError, clearParroquiaSeleccionada, resetPagination , setParroquiaSeleccionada} = parroquiasSlice.actions;

// Selectores
//export const selectParroquias = (state) => state.parroquias.parroquias;
export const selectParroquias = (state) => state.parroquias?.parroquias || [] 
export const selectTotalItems = (state) => state.parroquias.totalItems;
export const selectTotalPages = (state) => state.parroquias.totalPages;
export const selectCurrentPage = (state) => state.parroquias.currentPage;
export const selectAllParroquias = (state) => state.parroquias?.allParroquias ?? []
export const selectParroquiaSeleccionada = (state) => state.parroquias?.parroquiaSeleccionada ?? null
export const selectIsLoading = (state) => state.parroquias?.isLoading ?? false
export const selectIsLoadingAll = (state) => state.parroquias?.isLoadingAll ?? false
export const selectIsLoadingById = (state) => state.parroquias?.isLoadingById ?? false
export const selectIsSaving = (state) => state.parroquias.isSaving;
export const selectError = (state) => state.parroquias?.error ?? null

// 🚀 Exportar reducer
export const parroquiasReducer = parroquiasSlice.reducer;
export default parroquiasSlice.reducer;
