<script setup lang="ts">
import type { InputHTMLAttributes } from 'vue';

interface Props {
  modelValue: string;
  name: string;
  placeholder?: string;
  password?: boolean;
  showLabel?: boolean;
}

withDefaults(defineProps<Props>(), {
  password: false,
  showLabel: false
});

defineEmits<{
  (e: 'update:modelValue', modelValue: string): void;
}>();

</script>

<template>
  <div class="mt-2 flex flex-column">
    <label 
      v-if="showLabel"
      :for="name" 
      class="text-sm mb-1">
      {{ $capitalize(name) }}
    </label>

    <input
      class="p-2 w-full bg-color text-primary appearance-none border-none border-round-md focus:border-1"
      :type="password ? 'password' : 'text'" 
      :name="name"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as InputHTMLAttributes).value)"
      :placeholder="placeholder">
  </div>
</template>

<style scoped>
</style>