import { ref } from 'vue';
import { AxiosError } from "axios";
import apiClient from '@/helpers/http';

interface IEmployee {
  id: number;
  nombre: string;
  correo: string;
  cargo: string;
  departamento: string;
  oficina: string;
  estadoCuenta: string;
}

interface ErrorCulqi {
  message: string;
  status: string;
}

export default function useEmployees() {
  const employees = ref<IEmployee[]>([]);
  const loadingEmployee = ref(true)
  const errorEmployee = ref('')
  const totalEmployee = ref(0)

  async function fetchEmployees(params: string = '') {
    loadingEmployee.value = true
    try {
      const { data } = await apiClient.get(`empleados${params}`);
      employees.value = data.data
      totalEmployee.value = data.total
    } catch (e) {
      const error = e as AxiosError
      const data = error.response?.data as ErrorCulqi
      errorEmployee.value = data.message || 'Hubo un error, vuelva a intentar'
    } finally {
      loadingEmployee.value = false
    }
  }

  return {
    fetchEmployees,
    totalEmployee,
    employees,
    loadingEmployee,
    errorEmployee
  };
}