<template>
  <div class="employee-page">
    <div class="employee">
      <div class="employee__title">
        <div class="employee__title-label">
          <h4>Empleados</h4>
          <p>Gestiona tus empleados</p>
        </div>
        <div class="employee__title-options">
          <template v-if="firstLoad">
            <div class="buttons-loading">
              <div v-for="i in 2" :key="i" class="h-10 bg-gray-100 rounded-full w-28"></div>
            </div>
          </template>
          <template v-else>
            <UiButton class="btn-download">
              <span class="flex items-center"><span class="material-symbols-outlined">download</span> Descargar</span>
            </UiButton>
            <UiButton class="btn-new">
              <span class="flex items-center"><span class="material-symbols-outlined">add</span> Nuevo</span>
            </UiButton>
          </template>
        </div>
      </div>
      <div class="employee__filter">
        <div class="filter">
          <template v-if="firstLoad">
            <div class="filter__loading">
              <div
                v-for="i in 3"
                :key="i"
                class="h-10 bg-gray-100 rounded-full w-full"
              ></div>
            </div>
          </template>
          <template v-else>
            <div class="filter__fullname">
              <UiInputField
                v-model="form.employee"
                placeholder="Buscar empleado"
                id="fieldFullname"
              />
            </div>
            <div class="filter__position">
              <UiSelect
                v-model="form.position"
                placeholder="Nombre de cargo"
                :options="LIST_POSITIONS"
              />
            </div>
          </template>
        </div>
      </div>
      <div class="employee__table">
        <TableLoading v-if="firstLoad" />
        <table v-else class="table-auto">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Nombre cargo</th>
              <th>Departamento</th>
              <th>Oficina</th>
              <th>Cuenta</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="employee in employees" :key="`employee${employee.id}`">
              <td>
                <span class="font-medium">{{ employee.nombre }}</span>
                <span class="email">{{ employee.correo }}</span>
              </td>
              <td>{{ employee.cargo }}</td>
              <td>{{ employee.departamento }}</td>
              <td>{{ employee.oficina }}</td>
              <td>{{ employee.estadoCuenta }}</td>
              <td>
                <div class="td-options">
                  <button class="btn-eye"><span class="material-symbols-outlined">visibility</span></button>
                  <button class="btn-edit"><span class="material-symbols-outlined">edit</span></button>
                  <button class="btn-delete"><span class="material-symbols-outlined">delete</span></button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="!firstLoad" class="employee__footer">
        <div class="pagination">
          <UiPagination
            class="!w-auto"
            :total-pages="totalPages"
            :total="totalEmployee"
            :per-page="limit"
            :current-page="currentPage"
            @pagechanged="handleChangePage"
          />
        </div>
        <div class="limit">
          <span class="limit__label">Mostrando 1 a {{ limit }} de {{ totalEmployee  }} registros</span>
          <TableLimitSelect @change="handleSelectLimit"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { LIST_POSITIONS } from '@/utils/positions';
  import UiInputField from '@/components/ui/UiInputField.vue';
  import UiSelect from '@/components/ui/UiSelect.vue';
  import UiButton from '@/components/ui/UiButton.vue';
  import UiPagination from '@/components/ui/UiPagination.vue';
  import TableLimitSelect from '@/components/table/TableLimitSelect.vue';
  import TableLoading from '@/components/table/TableLoading.vue';

  const form = reactive({ employee: '', position: '' })
  const limit = ref(5)
  const currentPage = ref(1)
  const firstLoad = ref(true)

  const { employees, totalEmployee, loadingEmployee, fetchEmployees } = useEmployees();

  const totalPages = computed(() => {
    return Math.ceil(totalEmployee.value / limit.value);
  })

  watch(loadingEmployee, () => {
    if (firstLoad.value) {
      firstLoad.value = false
    }
  })

  onMounted(() => {
    getEmployeeParams()
  });

  const getEmployeeParams = () => {
    let params = `?limit=${limit.value}&page=${currentPage.value}`
    fetchEmployees(params)
  }

  const handleChangePage = (value: number) => {
    currentPage.value = value
    getEmployeeParams()
  }

  const handleSelectLimit = (value: number) => {
    limit.value = value
    currentPage.value = 1
    getEmployeeParams()
  }

</script>

<style lang="scss" scoped>
.employee-page {
  @apply bg-white rounded-2xl w-full min-h-full flex p-6;
  .employee {
    @apply flex flex-col gap-6 w-full;
    &__title {
      @apply flex justify-between w-full flex-row;
      &-label {
        @apply flex items-start flex-col justify-center;
        h4 {
          @apply text-gray-950 text-2xl font-bold mb-2;
        }
        p {
          @apply text-gray-600 text-sm font-medium;
        }
      }
      &-options {
        @apply gap-5 flex flex-row;
        .buttons-loading{
          @apply flex gap-4 flex-row justify-between w-full;
        }
        button {
          @apply px-5 rounded-[10px];
          span {
            @apply flex gap-2;
          }
        }
        .btn-download {
          @apply border border-gray-950 text-gray-950 bg-transparent;
        }
        .btn-new {
          @apply border border-gray-950 text-white bg-gray-950;
        }
      }
    }
    &__filter {
      .filter{
        @apply flex w-full gap-4 flex-row;
        &__loading {
          @apply flex gap-4 flex-row justify-between w-full;
        }
        &__fullname {
          @apply flex w-full;
        }
        &__position {
          @apply w-[315px];
        }
      }
    }
    &__table {
      @apply flex w-full  flex-row;
      table {
        @apply relative w-full;
        thead {
          tr {
            th {
              @apply bg-gray-50 p-4 h-14 font-bold text-xs text-gray-600 text-left;
              @apply last:text-right;
              &:first-child {
                border-radius: 10px 0 0 10px;
              }
              &:last-child {
                border-radius: 0 10px 10px 0;
              }
            }
          }
        }
        tbody {
          tr {
            @apply border-b border-gray-100;
            td {
              @apply bg-white p-4 font-normal text-xs text-gray-950;
              .email{
                @apply text-gray-500 text-[10px] block;
              }
              .td-options {
                @apply last:gap-[10px] flex justify-end flex-row;
              }
              button {
                @apply rounded-lg text-white w-[30px] h-[30px] flex items-center justify-center p-0;
                span{
                  @apply text-lg;
                }
                &.btn-eye {
                  @apply bg-primary;
                }
                &.btn-edit {
                  @apply bg-blue-600;
                }
                &.btn-delete {
                  @apply bg-red-600;
                }
              }
            }
          }
        }
      }
    }
    &__footer {
      @apply flex flex-row justify-between;
      .pagination {

      }
      .limit {
        @apply flex flex-row gap-4 items-center;
        &__label {
          @apply text-xs text-gray-700;
        }
        &__select{

        }
      }
    }
  }
}
</style>