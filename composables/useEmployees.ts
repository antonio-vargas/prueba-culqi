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
    await useHttp(`empleados${params}`, {
      method: 'GET',
      onResponse({ response }) {
        const { data, status, total } = response._data
        if (status === 'success') {
          employees.value = data
          totalEmployee.value = total
        }
        loadingEmployee.value = false
      },
      onResponseError({ response }) {
        const data = response._data as ErrorCulqi
        errorEmployee.value = data?.message || 'Hubo un error, vuelva a intentar'
        loadingEmployee.value = false
      }
    });
  }

  return {
    fetchEmployees,
    totalEmployee,
    employees,
    loadingEmployee,
    errorEmployee
  };
}