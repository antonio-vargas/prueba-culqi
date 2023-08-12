<template>
  <div class="ui-input">
    <label
      v-if="!!label"
      :for="id"
      class="ui-input__label"
    >
      {{ label }}<span v-if="isRequired" class="text-red ml-1">*</span>
    </label>
    <div class="relative w-full block">
      <input
        :id="id"
        v-model="inputValue"
        class="ui-input__input"
        :type="type"
        :placeholder="placeholder"
        @input="updateValue"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, withDefaults } from 'vue'

interface InputFieldProps  {
  modelValue: string;
  label?: string;
  type?: string;
  isRequired?: boolean;
  placeholder?: string;
  id?: string;
}

const props = withDefaults(defineProps<InputFieldProps>(), {
  modelValue: '',
  type: "text",
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
.ui-input {
  @apply w-full flex flex-col gap-[10px];
  &__label {
    @apply w-full block font-medium text-sm text-gray-900;
  }
  &__input {
    @apply text-black text-sm w-full h-14 px-5;
    @apply border border-gray-500 rounded-md;
    @apply focus:border-primary focus:outline-none;
  }
}
</style>