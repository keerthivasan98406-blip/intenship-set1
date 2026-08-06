import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

// Attach auth token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ─── Auth ────────────────────────────────────
export const authService = {
  login: async (username, password) => {
    const res = await API.post('/auth/login', { username, password });
    return res.data;
  },
  getMe: async () => {
    const res = await API.get('/auth/me');
    return res.data;
  },
};

// ─── Projects ────────────────────────────────
export const projectService = {
  getAll: async (category) => {
    const params = category && category !== 'All' ? { category } : {};
    const res = await API.get('/projects', { params });
    return res.data;
  },
  getById: async (id) => {
    const res = await API.get(`/projects/${id}`);
    return res.data;
  },
  create: async (data) => {
    const res = await API.post('/projects', data);
    return res.data;
  },
  update: async (id, data) => {
    const res = await API.put(`/projects/${id}`, data);
    return res.data;
  },
  delete: async (id) => {
    const res = await API.delete(`/projects/${id}`);
    return res.data;
  },
};

// ─── Skills ──────────────────────────────────
export const skillService = {
  getAll: async () => {
    const res = await API.get('/skills');
    return res.data;
  },
  create: async (data) => {
    const res = await API.post('/skills', data);
    return res.data;
  },
  update: async (id, data) => {
    const res = await API.put(`/skills/${id}`, data);
    return res.data;
  },
  delete: async (id) => {
    const res = await API.delete(`/skills/${id}`);
    return res.data;
  },
};

// ─── Messages ────────────────────────────────
export const messageService = {
  create: async (data) => {
    const res = await API.post('/contact', data);
    return res.data;
  },
  getAll: async () => {
    const res = await API.get('/messages');
    return res.data;
  },
  delete: async (id) => {
    const res = await API.delete(`/messages/${id}`);
    return res.data;
  },
};

export default API;
