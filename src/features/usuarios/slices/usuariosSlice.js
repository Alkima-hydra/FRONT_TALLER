import { createSlice } from '@reduxjs/toolkit';
import {
  fetchUsuarios,
  fetchAllUsuarios,
  fetchUsuarioById,
  createUsuario,
  updateUsuario,
  deleteUsuario,
} from './usuariosTrunk';

const initialState = {
  Usuarios: [],
  totalItems: 0,
  totalPages: 1,
  currentPage: 1,

  allUsuarios: [],
  UsuarioSeleccionada: null,

  isLoading: false,
  isLoadingAll: false,
  isLoadingById: false,
  isCreating: false,
  isUpdating: false,
  isDeleting: false,
  error: null,
};

const UsuariosSlice = createSlice({
  name: 'Usuarios',
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
    clearUsuarioSeleccionada(state) {
      state.UsuarioSeleccionada = null;
    },
    resetPagination(state) {
      state.Usuarios = [];
      state.totalItems = 0;
      state.totalPages = 1;
      state.currentPage = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchUsuarios (paginado)
      .addCase(fetchUsuarios.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUsuarios.fulfilled, (state, action) => {
        state.isLoading = false;
        state.Usuarios = action.payload.Usuarios;
        state.totalItems = action.payload.totalItems;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(fetchUsuarios.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || 'Error al cargar Usuarios';
      })

      // fetchAllUsuarios
      .addCase(fetchAllUsuarios.pending, (state) => {
        state.isLoadingAll = true;
        state.error = null;
      })
      .addCase(fetchAllUsuarios.fulfilled, (state, action) => {
        state.isLoadingAll = false;
        state.allUsuarios = action.payload;
      })
      .addCase(fetchAllUsuarios.rejected, (state, action) => {
        state.isLoadingAll = false;
        state.error = action.payload?.message || 'Error al cargar todas las Usuarios';
      })

      // fetchUsuarioById 
      .addCase(fetchUsuarioById.pending, (state) => {
        state.isLoadingById = true;
        state.error = null;
      })
      .addCase(fetchUsuarioById.fulfilled, (state, action) => {
        state.isLoadingById = false;
        state.UsuarioSeleccionada = action.payload;
      })
      .addCase(fetchUsuarioById.rejected, (state, action) => {
        state.isLoadingById = false;
        state.error = action.payload?.message || 'Error al cargar la Usuario';
      })

      // createUsuario
      .addCase(createUsuario.pending, (state) => {
        state.isCreating = true;
        state.error = null;
      })
      .addCase(createUsuario.fulfilled, (state, action) => {
        state.isCreating = false;
        const nueva = action.payload;
        // Si ya hay lista paginada cargada, insertamos al inicio (opcional)
        if (Array.isArray(state.Usuarios)) {
          state.Usuarios = [nueva, ...state.Usuarios];
          state.totalItems = (state.totalItems || 0) + 1;
        }
        state.UsuarioSeleccionada = nueva;
      })
      .addCase(createUsuario.rejected, (state, action) => {
        state.isCreating = false;
        state.error = action.payload?.message || 'Error al crear Usuario';
      })

      // updateUsuario
      .addCase(updateUsuario.pending, (state) => {
        state.isUpdating = true;
        state.error = null;
      })
      .addCase(updateUsuario.fulfilled, (state, action) => {
        state.isUpdating = false;
        const updated = action.payload;
        state.Usuarios = state.Usuarios.map(p => p.id === updated.id ? updated : p);
        if (state.UsuarioSeleccionada?.id === updated.id) {
          state.UsuarioSeleccionada = updated;
        }
      })
      .addCase(updateUsuario.rejected, (state, action) => {
        state.isUpdating = false;
        state.error = action.payload?.message || 'Error al actualizar Usuario';
      })

      // deleteUsuario
      .addCase(deleteUsuario.pending, (state) => {
        state.isDeleting = true;
        state.error = null;
      })
      .addCase(deleteUsuario.fulfilled, (state, action) => {
        state.isDeleting = false;
        const deletedId = action.payload.id;
        state.Usuarios = state.Usuarios.filter(p => p.id !== deletedId);
        if (state.UsuarioSeleccionada?.id === deletedId) {
          state.UsuarioSeleccionada = null;
        }
        state.totalItems = Math.max(0, (state.totalItems || 1) - 1);
      })
      .addCase(deleteUsuario.rejected, (state, action) => {
        state.isDeleting = false;
        state.error = action.payload?.message || 'Error al eliminar Usuario';
      });
  },
});

// Acciones síncronas
export const { clearError, clearUsuarioSeleccionada, resetPagination } = UsuariosSlice.actions;

// Selectores
export const selectUsuarios = (state) => state.Usuarios.Usuarios;
export const selectTotalItems = (state) => state.Usuarios.totalItems;
export const selectTotalPages = (state) => state.Usuarios.totalPages;
export const selectCurrentPage = (state) => state.Usuarios.currentPage;
export const selectAllUsuarios = (state) => state.Usuarios.allUsuarios;
export const selectUsuarioSeleccionada = (state) => state.Usuarios.UsuarioSeleccionada;

// Para loading maybe borrar si no tiene la wea esa que gira al cargar
export const selectIsLoading = (state) => state.Usuarios.isLoading;
export const selectIsLoadingAll = (state) => state.Usuarios.isLoadingAll;
export const selectIsLoadingById = (state) => state.Usuarios.isLoadingById;
export const selectError = (state) => state.Usuarios.error;
export const selectIsCreating = (state) => state.Usuarios.isCreating;
export const selectIsUpdating = (state) => state.Usuarios.isUpdating;
export const selectIsDeleting = (state) => state.Usuarios.isDeleting;

// Exportar reducer
export const UsuariosReducer = UsuariosSlice.reducer;
export default UsuariosSlice.reducer;