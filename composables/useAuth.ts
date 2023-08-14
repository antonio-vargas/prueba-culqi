import { useAuthStore } from '@/stores/auth.store';

interface Login {
  correo: string;
  password: string;
}

interface ErrorCulqi {
  message: string;
  status: string;
}

export default function useAuth() {
  const router = useRouter();
  const loadingAuth = ref(false);
  const errorAuth = ref("");
  const authStore = useAuthStore();

  async function submitLogin(payload: Login) {
    loadingAuth.value = true
    await useHttp('auth/login', {
      method: 'POST',
      body: payload,
      onResponse({ response }) {
        loadingAuth.value = false
        const { data, status } = response._data
        if (status === 'success') {
          const { user, token } = data
          authStore.setUser(user)
          authStore.setToken(token)
          router.replace({ path: '/panel/empleados' });
        }
      },
      onResponseError({ response }) {
        loadingAuth.value = false
        const data = response._data as ErrorCulqi
        errorAuth.value = data?.message || 'Hubo un error, vuelva a intentar'
      }
    });
  }

  return {
    loadingAuth,
    errorAuth,
    submitLogin,
  };
}