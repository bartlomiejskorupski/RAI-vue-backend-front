<script setup lang="ts">
import type { BusStopItem } from '@/model/bus-stop-item.model';
import { computed } from 'vue';


const props = defineProps<{
  stops: BusStopItem[];
  favoriteIds?: number[];
  filter?: string;
  loading?: boolean;
}>();

defineEmits<{
  (e: 'favorite', stopId: number): void;
  (e: 'stopChosen', stop: BusStopItem): void;
}>();

const filteredStops = computed(() => {
  if(!props.filter) {
    return props.stops;
  }
  return props.stops.filter(stop => 
    stop.name?.toLocaleLowerCase().includes(props.filter!));
});

function isFavorite(stopId: number) {
  if (!props.favoriteIds){
    return '🖤';
  }
  
  return props.favoriteIds.includes(stopId) ? '💛' : '🖤';
};
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
      class="py-1 flex justify-content-between cursor-pointer highlight"
      @click="$emit('stopChosen', stop)">

      <div class="text-lg pt-1">
        {{ stop.name }}
      </div>

      <div 
        @click.stop="$emit('favorite', stop.stopId!)"
        class="text-2xl">
        {{ isFavorite(stop.stopId!) }}
      </div>

    </div>

  </div>
</template>

<style scoped>
.stop-list {
  max-height: 20rem;
  overflow-y: auto;
}

.highlight:hover {
  background: var(--color-background-mute);
}

</style>