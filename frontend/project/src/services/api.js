import axios from 'axios';

const api = axios.create({
  baseURL: 'https://blog-app-vert-nine.vercel.app//api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const auth = {
  register: (data) => api.post('/users/register', data),
  login: (data) => api.post('/users/login', data),
  getProfile: () => api.get('/users/profile'),
};

export const blogs = {
  getAll: () => api.get('/blogs/all'),
  getMyBlogs: () => api.get('/blogs/user'),
  create: (formData) => api.post('/blogs/create', formData),
  delete: (id) => api.delete(`/blogs/${id}`),
};

export default api;