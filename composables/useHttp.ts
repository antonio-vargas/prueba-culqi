import { useAuthStore } from '@/stores/auth.store';

export const useHttp = async (path: string, options: any) => {
  let settings = { ...options }
  const authStore = useAuthStore();
  if (authStore.token) {
    settings = {
      ...settings,
      headers: {
        Authorization: `Bearer ${authStore.token}`
      }
    }
  }
  return await useFetch(`https://fepruebatecnicaculqi-backend-production.up.railway.app/${path}`, settings)
}