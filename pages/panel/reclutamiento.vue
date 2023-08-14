<template>
  <div class="employee-page">
    <div class="employee">
      <div class="employee__title">
        <div class="employee__title-label">
          <h4>Reclutamiento</h4>
          <p>Gestiona tus reclutamientos</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">

</script>

<style lang="scss" scoped>
.employee-page {
  @apply bg-white rounded-2xl w-full flex h-full p-6;
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
    &__pagination {
      
    }
  }
}
</style>