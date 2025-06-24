import axios from 'axios';
import { endPoints } from './endPoints';

const apiClient = axios.create({
  baseURL: endPoints.BASE_URL,
  timeout: 60000, // 10s timeout
  headers: {
    'Content-Type': 'application/json',
  },
});


apiClient.interceptors.request.use(
  (config) => {
    const token = 'YOUR_TOKEN';
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response?.status === 401) {
      console.log('Unauthorized! Redirect to login.');
    }
    return Promise.reject(error?.response?.data || error);
  }
);

export default apiClient;