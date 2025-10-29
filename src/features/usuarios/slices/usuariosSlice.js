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
  usuarios: [],
  totalItems: 0,
  totalPages: 1,
  currentPage: 1,

  allUsuarios: [],
  usuarioSeleccionado: null,

  isLoading: false,
  isLoadingAll: false,
  isLoadingById: false,
  isCreating: false,
  isUpdating: false,
  isDeleting: false,
  error: null,
};

const usuariosSlice = createSlice({
  name: 'usuarios',
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
    clearUsuarioSeleccionado(state) {
      state.usuarioSeleccionado = null;
    },
    resetPagination(state) {
      state.usuarios = [];
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
        state.usuarios = action.payload.usuarios;
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
        state.usuarioSeleccionado = action.payload;
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
        if (Array.isArray(state.usuarios)) {
          state.usuarios = [nueva, ...state.usuarios];
          state.totalItems = (state.totalItems || 0) + 1;
        }
        state.usuarioSeleccionado = nueva;
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
        state.usuarios = state.usuarios.map(p => p.id === updated.id ? updated : p);
        if (state.usuarioSeleccionado?.id === updated.id) {
          state.usuarioSeleccionado = updated;
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
        state.usuarios = state.usuarios.filter(p => p.id !== deletedId);
        if (state.usuarioSeleccionado?.id === deletedId) {
          state.usuarioSeleccionado = null;
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
export const { clearError, clearUsuarioSeleccionado, resetPagination } = usuariosSlice.actions;

// Selectores
export const selectUsuarios = (state) => state.usuarios.usuarios;
export const selectTotalItems = (state) => state.usuarios.totalItems;
export const selectTotalPages = (state) => state.usuarios.totalPages;
export const selectCurrentPage = (state) => state.usuarios.currentPage;
export const selectAllUsuarios = (state) => state.usuarios.allUsuarios;
export const selectUsuarioSeleccionado = (state) => state.usuarios.usuarioSeleccionado;

// Para loading maybe borrar si no tiene la wea esa que gira al cargar
export const selectIsLoading = (state) => state.usuarios.isLoading;
export const selectIsLoadingAll = (state) => state.usuarios.isLoadingAll;
export const selectIsLoadingById = (state) => state.usuarios.isLoadingById;
export const selectError = (state) => state.usuarios.error;
export const selectIsCreating = (state) => state.usuarios.isCreating;
export const selectIsUpdating = (state) => state.usuarios.isUpdating;
export const selectIsDeleting = (state) => state.usuarios.isDeleting;

// Exportar reducer
export const usuariosReducer = usuariosSlice.reducer;
export default usuariosSlice.reducer;