import { defineStore } from 'pinia';
interface IEmployee {
  id: number;
  nombre: string;
  correo: string;
  cargo: string;
  departamento: string;
  oficina: string;
  estadoCuenta: string;
}


export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    user: JSON.parse(localStorage.getItem('user') || '{}'),
    token: localStorage.getItem('token') || ''
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    setUser(payload: IEmployee) {
      this.user = payload;
      localStorage.setItem('user', JSON.stringify(payload));
    },
    setToken(token: string) {
      this.token = token;
      localStorage.setItem('token', token);
    },
    logout() {
      this.user = null;
      this.token = '';
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
  }
});