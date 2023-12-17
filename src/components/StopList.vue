<script setup lang="ts">
import type { BusStopItem } from '@/model/bus-stop-item.model';
import { computed } from 'vue';


const props = defineProps<{
  stops: BusStopItem[];
  filter?: string;
  loading?: boolean;
}>();


const filteredStops = computed(() => {
  if(!props.filter) {
    return props.stops;
  }
  return props.stops.filter(stop => 
    stop.name?.toLocaleLowerCase().includes(props.filter!));
});

</script>

<template>
  <div class="mt-2 p-2 border-round-md bg-soft stop-list">

    <div v-if="loading">
      Loading...
    </div>

    <div v-else-if="!filteredStops.length">
      Empty...
    </div>

    <div
      v-else
      v-for="stop in filteredStops"
      class="py-1 flex justify-content-between">

      <div class="text-lg">
        {{ stop.name }}
      </div>

      <div class="">
        🖤
      </div>

    </div>

  </div>
</template>

<style scoped>
.stop-list {
  max-height: 20rem;
  overflow-y: auto;
}
</style>