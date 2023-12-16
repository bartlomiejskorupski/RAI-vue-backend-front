<script setup lang="ts">
import { ref } from 'vue';
import CustomInput from './CustomInput.vue';

const filter = ref("");

</script>

<template>
  <div class="m-2 p-3 border-round-md w-24rem bg-mute">
    <div class="text-3xl text-center">Bus Stops</div>
    <CustomInput name="filter"
      v-model="filter"
      placeholder="Filter bus stops...">
    </CustomInput>
    <div class="">{{ filter  }}</div>
  </div>

</template>

<style scoped>
</style>
