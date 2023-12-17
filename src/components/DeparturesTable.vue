<script setup lang="ts">
import type { Departure } from '@/model/departure.model';

defineProps<{
  stopName?: string;
  lastUpdate?: Date;
  departures?: Departure[];
  loading: boolean;
}>();
</script>

<template>
  <div class="mt-2 p-2 border-round-md bg-soft text-center">

    <template v-if="loading">
      Loading...
    </template>

    <template v-else>

      <div class="text-lg mb-1">
        {{ stopName }}
      </div>
      
      <div class="text-xs">
        Last update: {{ lastUpdate?.toLocaleTimeString() }}
      </div>

      <div class="grid grid-nogutter">

        <div class="col-2 font-bold">Line</div>
        <div class="col-7 font-bold">Direction</div>
        <div class="col-3 font-bold">Time</div>

        <template v-for="dep in departures">

          <hr class="col-12 delimiter">

          <div class="col-2">
            {{ dep.routeId }}
          </div>

          <div class="col-7">
            {{ dep.headsign }}
          </div>

          <div class="col-3">
            {{ dep.estimatedTime }}
          </div>

        </template>

      </div>

    </template>

  </div>
</template>

<style scoped>
.delimiter {
  border-color: var(--color-border-hover);
}
</style>