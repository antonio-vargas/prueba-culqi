<template>
  <table class="table-auto">
    <thead>
      <tr>
        <th v-for="c in columns" :key="`columns-th-${c}`">
          <div class="h-5 bg-gray-200 rounded-full w-full"></div>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="i in rows" :key="`rows-${i}`">
        <td v-for="c in columns" :key="`columns-td-${c}`">
          <div class="h-5 bg-gray-100 rounded-full w-full"></div>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script setup lang="ts">
interface TableProps  {
  rows?: number;
  columns?: number;
}

withDefaults(defineProps<TableProps>(), {
  rows: 5,
  columns: 5
})
</script>
<style lang="scss" scoped>
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
        @apply bg-white p-4 font-normal text-xs ;
      }
    }
  }
}
</style>