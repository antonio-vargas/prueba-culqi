<template>
  <ul class="inline-flex pagination-custom_wrapper">
    <li class="pagination-custom_item">
      <button
        type="button"
        class="bg-white text-gray-950 border-gray-950 disabled:border-gray-400 disabled:text-gray-400 disabled:hover:cursor-not-allowed hover:pointer"
        @click="onClickPreviousPage"
        :disabled="isInFirstPage"
        aria-label="Go to previous page"
      >
        <span class="material-symbols-outlined">keyboard_arrow_left</span>
      </button>
    </li>

    <li
      v-for="(page, index) in pages"
      :key="`page${index}`"
      class="pagination-custom_item"
    >
      <button
        type="button"
        class="hover:pointer bg-white"
        @click="onClickPage(page.name)"
        :disabled="page.isDisabled"
        :class="[
          isPageActive(page.name)
            ? 'text-gray-950 border-gray-950'
            : 'text-gray-400 border-gray-400',
        ]"
      >
        {{ page.name }}
      </button>
    </li>

    <li class="pagination-custom_item">
      <button
        type="button"
        class="bg-white text-gray-950 border-gray-950 disabled:border-gray-400 disabled:text-gray-400 disabled:hover:cursor-not-allowed hover:pointer"
        @click="onClickNextPage"
        :disabled="isInLastPage"
        aria-label="Go to next page"
      >
        <span class="material-symbols-outlined">keyboard_arrow_right</span>
      </button>
    </li>
  </ul>
</template>
<script setup lang="ts">
import { computed, withDefaults } from 'vue'

interface PaginationProps  {
  maxVisibleButtons?: number;
  totalPages: number;
  total: number;
  perPage: number;
  currentPage: number;
}

const props = withDefaults(defineProps<PaginationProps>(), {
  maxVisibleButtons: 5,
})

const emit = defineEmits(['pagechanged'])

const startPage = computed(() => {
  if (props.currentPage === 1) {
    return 1;
  }

  if (props.currentPage === props.totalPages) {
    if (props.totalPages < props.maxVisibleButtons) return props.totalPages - 1;
    return props.totalPages - props.maxVisibleButtons + 1;
  }
  return props.currentPage - 1;
})

const endPage = computed(() => {
  return Math.min(startPage.value + props.maxVisibleButtons - 1, props.totalPages);
})

const pages = computed(() => {
  const range = [];
  for (let i = startPage.value; i <= endPage.value; i += 1) {
    range.push({
      name: i,
      isDisabled: i === props.currentPage,
    });
  }
  return range;
})

const isInFirstPage = computed(() => {
  return props.currentPage === 1;
})

const isInLastPage = computed(() => {
  return props.currentPage === props.totalPages;
})

const onClickPreviousPage = () => {
  emit("pagechanged", props.currentPage - 1);
}

const onClickPage = (page: number) => {
  emit("pagechanged", page);
}

const onClickNextPage = () => {
  emit("pagechanged", props.currentPage + 1);
}

const isPageActive = (page: number) => {
  return props.currentPage === page;
}
    
</script>
<style lang="scss" scoped>
  .pagination-custom {
    &_wrapper {
      @apply flex w-full justify-start;
    }

    &_item {
      /* @apply w-[30px] h-[34px] inline-flex justify-center items-center; */
      button {
        @apply w-8 h-8 inline-flex justify-center items-center border rounded font-semibold;
      }

      & + .pagination-custom_item {
        @apply ml-2;

        @screen lg {
          @apply ml-2;
        }
      }
    }
  }
</style>
