
<template>
  <div class="limit-select">
    <button
      class="limit-select__button"
      type="button"
      @click="handleToggleCollapse"
    >
      Mostrar {{ count }}
      <span
        class="material-symbols-outlined"
      >{{ !toggleCollapse ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}</span>
    </button>
    <div
      class="limit-select__options"
      v-if="toggleCollapse"
    >
      <div
        v-for="i in 4"
        :key="`option${i}`"
        class="limit-select__option"
        :class="{
          'active': i*5 === count
        }"
        @click="handleSelectOption(i*5)"
      >
        {{ i*5 }}
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const count = ref(5)
const toggleCollapse = ref(false)
const emit = defineEmits(['change'])

const handleSelectOption = (value: number) => {
  count.value = value
  handleToggleCollapse()
  emit("change", value);
}

const handleToggleCollapse = () => {
  toggleCollapse.value = !toggleCollapse.value
}

</script>
<style lang="scss" scoped>
.limit-select {
  @apply flex flex-row px-[10px] min-w-[110px] h-8 border border-gray-200 rounded-lg relative;
  &__button {
    @apply text-xs w-full font-medium text-gray-950 flex items-center justify-between;
  }
  &__options {
    @apply border border-gray-200 rounded-lg absolute bottom-8 shadow-sm w-full bg-white left-0;
    @apply overflow-hidden;
  }
  &__option {
    @apply flex justify-center font-medium text-gray-600 w-full p-2;
    @apply hover:cursor-pointer;
    &.active {
      @apply text-gray-950 bg-gray-300;
    }
  }
}
</style>
