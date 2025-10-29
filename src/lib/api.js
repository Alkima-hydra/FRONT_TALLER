import axios from 'axios';
import { store } from '../store/index';

const api = axios.create({
  baseURL: 'http://localhost:3000/api/',
});

// manejo de errores
const handleError = (error) => {
  throw error.response?.data || { message: error.message };
};

export const loginApi = {
  login: (credentials) =>
    api.post('/usuarios/', credentials).then((res) => res.data).catch(handleError),
};

// pa colocar el header
api.interceptors.request.use((config) => {
  const token = store.getState().login.user.token;
  if (token) {
    config.headers['x-token'] = token;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// ejemplo de como orgnizar
export const userApi = {
  fetchUser: () =>
api.get('/usuarios/').then((res) => res.data).catch(handleError),
  fetchAllUsers: () =>
    api.get('/usuarios/all').then((res) => res.data).catch(handleError),
  fetchUserById: (id) =>
    api.get(`/usuarios/${id}`).then((res) => res.data).catch(handleError),
};

export const personasApi = {
  fetchPersonas: (params = {}) =>
    api.get('/personas/', { params }).then((res) => res.data).catch(handleError),

  fetchAllPersonas: () =>
    api.get('/personas/all').then((res) => res.data).catch(handleError),

  fetchPersonaById: (id) =>
    api.get(`/personas/${id}`).then((res) => res.data).catch(handleError),
  createPersona: (data) =>
    api.post('/personas/new', data).then((res) => res.data).catch(handleError),
};