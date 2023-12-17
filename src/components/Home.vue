<script setup lang="ts">
import { inject, ref } from 'vue';
import CustomInput from './CustomInput.vue';
import StopList from './StopList.vue';
import { onMounted } from 'vue';
import type { AxiosError, AxiosResponse, AxiosStatic } from 'axios';
import type { AllStopsResponse } from '@/model/all-stops-response.model';
import { busStopToItem, type BusStopItem } from '@/model/bus-stop-item.model';

const axios = inject<AxiosStatic>('axios');

const filter = ref('');
const allStops = ref<BusStopItem[]>([]);
const loadingAll = ref(true);

onMounted(() => {
  loadingAll.value = true;

  axios?.get('/busstops', {
      headers: {
        Authorization: 'Bearer ' + localStorage['token']
      }
    }).then((res: AxiosResponse<AllStopsResponse>) => {
      allStops.value = res.data.stops.map(busStopToItem);
    }).catch((err: AxiosError) => {
      console.log(err);
    }).finally(() => {
      loadingAll.value = false;
    });

});

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
        :stops="allStops"
        :loading="loadingAll">
      </StopList>

    </div>

    <div class="m-2 p-3 border-round-md w-24rem bg-mute">
      <div class="text-3xl text-center">Favorite</div>



    </div>

    <div class="m-2 p-3 border-round-md w-24rem bg-mute">
      <div class="text-3xl text-center">Departures</div>
    </div>

  </div>
</template>

<style scoped>

</style>