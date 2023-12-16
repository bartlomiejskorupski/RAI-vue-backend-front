<script setup lang="ts">
import { ref } from 'vue';
import CustomInput from './CustomInput.vue';
import StopList from './StopList.vue';

const filter = ref('');

const allStops = ref<any[]>([]);

</script>

<template>
  <div class="h-full flex flex-wrap align-content-start">

    <div class="m-2 p-3 border-round-md w-24rem bg-mute">
      <div class="text-3xl text-center">Bus Stops</div>

      <CustomInput
        name="filter"
        v-model="filter"
        placeholder="Filter bus stops...">
      </CustomInput>

      <StopList 
        :filter="filter"
        :items="allStops">
      </StopList>

    </div>

    <div class="m-2 p-3 border-round-md w-24rem bg-mute">
      <div class="text-3xl text-center">Favorite</div>



    </div>

    <div class="m-2 p-3 border-round-md w-24rem bg-mute">
      <div class="text-3xl text-center">Bus Stops</div>
    </div>

  </div>
</template>

<style scoped>

</style>