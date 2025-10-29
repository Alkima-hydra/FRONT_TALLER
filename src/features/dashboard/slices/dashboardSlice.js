import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  Totales: {
    NPersonas: 0,
    NSacramentos: 0,
    NParroquias: 0,
    NSacraporAnio: 0,
    NSacraporParroquia: 0,
    NCantidadPersonasSacramentos: [], // ej. [{ bautizo_confirmacion: 23, bautizo_comunion: 20 }, ...]
  },
  isLoading: false,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setLoading(state) {
      state.isLoading = true;
    },
    setTotales(state, action) {
      state.Totales = action.payload;
      state.isLoading = false;
    },
  },
});

export const { setTotales, setLoading } = dashboardSlice.actions;

export const selectTotales = (state) => state.dashboard.Totales;
export const selectIsLoading = (state) => state.dashboard.isLoading;


export const dashboardReducer = dashboardSlice.reducer;

export default dashboardSlice.reducer;