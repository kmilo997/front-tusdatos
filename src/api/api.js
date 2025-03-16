import axios from 'axios'
import router from '../router';

const api = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
})

api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    if (error.response && error.response.status === 401) {
      router.push('/login');
    }
    return Promise.reject(error)
  }
);

export default api