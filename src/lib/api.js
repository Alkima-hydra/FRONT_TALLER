import axios from 'axios';
import { store } from '../store/index';

const api = axios.create({
  baseURL: 'http://localhost:3000/api/',
});

// Interceptor para manejar respuestas y errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // El servidor respondió con un código de error
      const errorData = {
        message: error.response.data?.msg || error.response.data?.message || 'Error en la petición',
        status: error.response.status,
        data: error.response.data,
      };
      return Promise.reject(errorData);
    } else if (error.request) {
      // La petición se hizo pero no hubo respuesta
      return Promise.reject({
        message: 'No se pudo conectar con el servidor',
        status: 0,
      });
    } else {
      // Error al configurar la petición
      return Promise.reject({
        message: error.message || 'Error desconocido',
        status: 0,
      });
    }
  }
);

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

//para errores


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

  updatePersona: (id, data) =>
    api.put(`/personas/${id}`, data).then((res) => res.data).catch(handleError),

  deletePersona: (id) =>
    api.patch(`/personas/${id}`).then((res) => res.data).catch(handleError),
};
export const usuariosApi = {
  fetchUsuarios: (params = {}) =>
    api.get('/usuarios/', { params }).then((res) => res.data).catch(handleError),

  fetchAllUsuarios: () =>
    api.get('/usuarios/all').then((res) => res.data).catch(handleError),

  fetchUsuarioById: (id) =>
    api.get(`/usuarios/${id}`).then((res) => res.data).catch(handleError),
  createUsuario: (data) =>
    api.post('/usuarios/new', data).then((res) => res.data).catch(handleError),

  updateUsuario: (id, data) =>
    api.put(`/usuarios/${id}`, data).then((res) => res.data).catch(handleError),

  deleteUsuario: (id) =>
    api.patch(`/usuarios/${id}`).then((res) => res.data).catch(handleError),

  // para restablecer contraseña
  resetPassword: (email) =>
    api.post('/password/solicitar', { email }).then((res) => res.data).catch(handleError),
  //para cambiar la contraseña
  changePassword: (token, newPassword) =>
    api.post('/password/cambiar', { token, newPassword }).then((res) => res.data).catch(handleError),
};

export const parroquiasApi = {
  fetchParroquias: (params = {}) =>
    api.get('/parroquias/', { params }).then((res) => res.data).catch(handleError),

  fetchAllParroquias: () =>
    api.get('/parroquias/all').then((res) => res.data).catch(handleError),

  fetchParroquiaById: (id) =>
    api.get(`/parroquias/${id}`).then((res) => res.data).catch(handleError),

  createParroquia: (data) =>
    api.post('/parroquias/new', data).then((res) => res.data).catch(handleError),

  updateParroquia: (id, data) =>
    api.put(`/parroquias/${id}`, data).then((res) => res.data).catch(handleError),
};
export const passwordApi = {
  solicitar: (email) => api.post('/password/solicitar', { email }),
  validar: (token) => api.get('/password/validar', { params: { token } }),
  cambiar: (token, newPassword) => api.post('/password/cambiar', { token, newPassword }),
};

export const auditoriaApi = {
  fetchAuditorias: (params = {}) =>
    api.get('/auditoria/', { params }).then((res) => res.data).catch(handleError),
};

export const dashboardApi = {
  fetchStats: (filters = {}) =>
    api.get('/dashboard/summary/', { params: filters }).then(res => res.data).catch(handleError),
};
