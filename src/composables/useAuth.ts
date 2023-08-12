import { ref } from 'vue';
import {AxiosError} from "axios";
import apiClient from '@/helpers/http';
import { useAuthStore } from '@/stores/auth.store';
import router from '@/router';

interface Login {
  correo: string;
  password: string;
}

interface ErrorCulqi {
  message: string;
  status: string;
}

export default function useAuth() {
  const isAuthenticated = ref(false);
  const errorAuth = ref("");
  const authStore = useAuthStore();

  async function submitLogin(payload: Login) {
    try {
      const { data } = await apiClient.post('auth/login', payload);
      const { token, user } = data.data
      authStore.setUser(user)
      authStore.setToken(token)
      router.replace({ path: '/panel/empleados' });
    } catch (e) {
      const error = e as AxiosError
      const data = error.response?.data as ErrorCulqi
      errorAuth.value = data.message || 'Hubo un error, vuelva a intentar'
    }
  }

  return {
    isAuthenticated,
    errorAuth,
    submitLogin,
  };
}