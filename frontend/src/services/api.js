import axios from 'axios';

const API_BASE = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

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
