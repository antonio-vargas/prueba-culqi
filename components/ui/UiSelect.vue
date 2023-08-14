<template>
  <div class="ui-select">
    <label
      v-if="!!label"
      :for="id"
      class="ui-input__label"
    >
      {{ label }}<span v-if="isRequired" class="text-red ml-1">*</span>
    </label>
    <div class="relative w-full block">
      <select
        :id="id"
        class="ui-select__select"
        v-model="inputValue"
        :placeholder="placeholder"
      >
        <option class="option-default" value="">{{ placeholder }}</option>
        <option
          v-for="(item, index) in options"
          :key="`option${index}`"
        >
          {{ item }}
        </option>
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { computed, withDefaults } from 'vue'

interface InputFieldProps  {
  modelValue: string;
  options: Array<String>;
  label?: string;
  isRequired?: boolean;
  placeholder?: string;
  id?: string;
}

const props = withDefaults(defineProps<InputFieldProps>(), {
  modelValue: '',
  type: "text",
  options: [],
  isRequired: false,
  placeholder: "Ingresar campo"
})

const emit = defineEmits(['update:modelValue'])

const inputValue = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})
</script>

<style lang="scss" scoped>
.ui-select {
  @apply w-full flex flex-col gap-[10px];
  &__label {
    @apply w-full block font-medium text-sm text-gray-900;
  }
  &__select {
    @apply text-black text-sm w-full h-14 px-5;
    @apply border border-gray-500 rounded-md;
    @apply focus:border-primary focus:outline-none;
    option {
      @apply py-3 px-2;
    }
  }
}
</style>