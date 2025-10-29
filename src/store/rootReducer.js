import { combineReducers } from '@reduxjs/toolkit';

import { loginReducer } from '../features/login/slices/loginSlice';
import { dashboardReducer } from '../features/dashboard/slices/dashboardSlice';
import { personasReducer } from '../features/personas/slices/personasSlice';
import { usuariosReducer } from '../features/usuarios/slices/usuariosSlice';
// Agregar otros reducers aqui sdjalsd
// Mantener los reducers en sus carpetas pofavo

export const rootReducer = combineReducers({
  login: loginReducer,
  dashboard: dashboardReducer,
  personas: personasReducer,
  usuarios: usuariosReducer,
});