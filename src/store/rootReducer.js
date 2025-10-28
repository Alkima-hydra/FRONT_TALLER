import { combineReducers } from '@reduxjs/toolkit';
import { loginReducer } from '../features/login/slices/loginSlice';
import dashboardReducer from '../features/dashboard/slices/dashboardSlice';
// Agregar otros reducers aqui sdjalsd
// Mantener los reducers en sus carpetas pofavo

export const rootReducer = combineReducers({
  login: loginReducer,
  dashboard: dashboardReducer,
});