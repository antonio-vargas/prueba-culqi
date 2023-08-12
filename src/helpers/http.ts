import axios from 'axios';
import { useAuthStore } from '@/stores/auth.store';
import router from '@/router';

const http = axios.create({
  baseURL: 'https://fepruebatecnicaculqi-backend-production.up.railway.app/',
});

http.interceptors.request.use((config) => {
  const authStore = useAuthStore();
  if (authStore.token) {
    config.headers['Authorization'] = `Bearer ${authStore.token}`;
  }
  return config;
});

http.interceptors.response.use(
  (response) => response,
  (error) => {
    const code = error.response && error.response.status
    if (code === 401 || code === 403) {
      const authStore = useAuthStore();
      authStore.logout();
      router.push('/');
    }
    return Promise.reject(error);
  }
);

export default http;