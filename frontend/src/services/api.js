import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL + '/api';


const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Important for cookies
});

// Add token to headers if available (as fallback)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  logout: () => api.post('/auth/logout'),
};

// Profile APIs
export const profileAPI = {
  get: () => api.get('/profile'),
  create: (data) => api.post('/profile', data),
  update: (data) => api.put('/profile', data),
};

// Project APIs
export const projectAPI = {
  getAll: (skill = '') => {
    const url = skill ? `/projects?skill=${encodeURIComponent(skill)}` : '/projects';
    return api.get(url);
  },
  create: (data) => api.post('/projects', data),
  update: (id, data) => api.put(`/projects/${id}`, data),
  delete: (id) => api.delete(`/projects/${id}`),
};

// Work APIs
export const workAPI = {
  getAll: () => api.get('/work'),
  create: (data) => api.post('/work', data),
  update: (id, data) => api.put(`/work/${id}`, data),
  delete: (id) => api.delete(`/work/${id}`),
};

// Skill APIs
export const skillAPI = {
  getAll: () => api.get('/skills'),
  getTop: () => api.get('/skills/top'),
  create: (data) => api.post('/skills', data),
  delete: (id) => api.delete(`/skills/${id}`),
};

export default api;
