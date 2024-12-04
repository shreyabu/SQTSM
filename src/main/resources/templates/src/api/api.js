import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://localhost:8090',
  baseURL: 'http://3.133.115.55:8090',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
