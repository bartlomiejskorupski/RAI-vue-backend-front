<script setup lang="ts">
import type { InputHTMLAttributes } from 'vue';

defineProps<{
  modelValue: string,
  name: string,
  placeholder?: string
  password?: boolean
}>();
defineEmits<{
  (e: 'update:modelValue', modelValue: string): void
}>();
</script>

<template>
  <div class="mt-2 flex flex-column">
    <label :for="name" class="text-sm mb-1">{{ name }}</label>
    <input :type="password ? 'password' : 'text'" 
      :name="name"
      class="p-2 w-full bg-color text-primary appearance-none border-none border-round-md focus:border-1"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as InputHTMLAttributes).value)"
      :placeholder="placeholder">
  </div>
</template>

<style scoped>
</style>