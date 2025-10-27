import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

// manejo de errores
const handleError = (error) => {
  throw error.response?.data || { message: error.message };
};

// ejemplo de como orgnizar
export const userApi = {
  fetchUser: () =>
    api.get('/user').then((res) => res.data).catch(handleError),
  updateUser: (id, data) =>
    api.put(`/user/${id}`, data).then((res) => res.data).catch(handleError),
};