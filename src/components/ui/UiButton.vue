<template>
  <button
    :type="type"
    class="ui-button"
    @click="$emit('click')"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
const { type } = defineProps({
  type: String,
  loading: Boolean,
});
</script>

<style lang="scss" scoped>
.ui-button {
  @apply h-14 flex items-center justify-center rounded-md text-white bg-gray-950 w-full;
}
</style>