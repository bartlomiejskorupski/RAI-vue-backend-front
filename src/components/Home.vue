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
const favorites = ref<BusStopItem[]>([]);
const loadingAll = ref(true);
const loadingFav = ref(true);
const favoriteIds = ref<number[]>([]);

onMounted(() => {
  getAllStops();
  getFavorites();
});

function getAllStops() {
  loadingAll.value = true;

  axios?.get('/busstops', {
      headers: {
        Authorization: 'Bearer ' + localStorage['token']
      }
    }).then((res: AxiosResponse<AllStopsResponse>) => {
      console.log('Fetched all:', res.data.stops.length);
      allStops.value = res.data.stops.map(busStopToItem);
    }).catch((err: AxiosError) => {
      console.log(err);
    }).finally(() => {
      loadingAll.value = false;
    });
}

function getFavorites() {
  loadingFav.value = true;

  axios?.get('busstops/favorite', {
      headers: {
        Authorization: 'Bearer ' + localStorage['token']
      }
    }).then((res: AxiosResponse<BusStopItem[]>) => {
      console.log('Fetched favorites:', res.data.length);
      favorites.value = res.data;
      favoriteIds.value = res.data.map(stop => stop.stopId!);
    }).catch((err: AxiosError) => {
      console.log(err);
    }).finally(() => {
      loadingFav.value = false;
    });
}

function addFavorite(stopId: number) {
  const name = allStops.value.find(s => s.stopId === stopId)?.name;

  axios?.post(`/busstops/add?stopId=${stopId}&name=${encodeURI(name!)}`, null, {
      headers: {
        Authorization: 'Bearer ' + localStorage['token']
      }
    }).then(_ => {
      favoriteIds.value.push(stopId);
      getFavorites();
    })
    .catch(err => {
      console.log(err);
    });
}

function deleteFavorite(stopId: number) {
  axios?.delete(`/busstops/favorite?stopId=${stopId}`, {
    headers: {
        Authorization: 'Bearer ' + localStorage['token']
      }
    }).then(_ => {
      const foundId = favoriteIds.value.findIndex(id => id === stopId);
      favoriteIds.value.splice(foundId, 1);
      getFavorites();
    })
    .catch(err => {
      console.log(err);
    });
}

function favoriteChange(stopId: number) {
  if(favoriteIds.value.includes(stopId)){
    deleteFavorite(stopId)
  }
  else {
    addFavorite(stopId);
  }
}
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
        :loading="loadingAll"
        :favorite-ids="favoriteIds"
        @favorite="favoriteChange($event)">
      </StopList>

    </div>

    <div class="m-2 p-3 border-round-md w-24rem bg-mute">
      <div class="text-3xl text-center">Favorite</div>

      <StopList 
        :filter="filter"
        :stops="favorites"
        :loading="loadingFav"
        :favorite-ids="favoriteIds"
        @favorite="favoriteChange($event)">
      </StopList>

    </div>

    <div class="m-2 p-3 border-round-md w-24rem bg-mute">
      <div class="text-3xl text-center">Departures</div>
    </div>

  </div>
</template>

<style scoped>

</style>