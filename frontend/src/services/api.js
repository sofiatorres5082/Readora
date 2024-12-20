import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL;

const apiConfig = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiConfig;
