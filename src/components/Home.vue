<script setup lang="ts">
import { inject, ref } from 'vue';
import CustomInput from './CustomInput.vue';
import StopList from './StopList.vue';
import { onMounted } from 'vue';
import type { AxiosError, AxiosResponse, AxiosStatic } from 'axios';
import type { AllStopsResponse } from '@/model/all-stops-response.model';
import { busStopToItem, type BusStopItem } from '@/model/bus-stop-item.model';
import DeparturesTable from './DeparturesTable.vue';
import type { Departure } from '@/model/departure.model';
import type { DeparturesResponse } from '@/model/departures-response.model';

const axios = inject<AxiosStatic>('axios');

const filter = ref('');

const allStops = ref<BusStopItem[]>([]);
const favorites = ref<BusStopItem[]>([]);
const favoriteIds = ref<number[]>([]);

const departures = ref<Departure[]>([]);
const lastDeparturesUpdate = ref<Date>();
const chosenStopName = ref<string>();

const loadingAll = ref(true);
const loadingFav = ref(true);
const loadingDepartures = ref(false);

onMounted(() => {
  loadingAll.value = true;
  loadingFav.value = true;

  fetchAllStops();
  fetchFavorites();
});

function fetchAllStops() {
  axios?.get('/busstops', {
      headers: {
        Authorization: 'Bearer ' + localStorage['token']
      }
    }).then((res: AxiosResponse<AllStopsResponse>) => {
      console.log('Fetched all:', res.data.stops.length);
      allStops.value = res.data.stops.map(busStopToItem);
    }).catch((err: AxiosError) => console.log(err))
      .finally(() => loadingAll.value = false);
}

function fetchFavorites() {
  axios?.get('busstops/favorite', {
      headers: {
        Authorization: 'Bearer ' + localStorage['token']
      }
    }).then((res: AxiosResponse<BusStopItem[]>) => {
      console.log('Fetched favorites:', res.data.length);
      favorites.value = res.data;
      favoriteIds.value = res.data.map(stop => stop.stopId!);
    }).catch((err: AxiosError) => console.log(err))
      .finally(() => loadingFav.value = false);
}

function addFavorite(stopId: number) {
  const name = allStops.value.find(s => s.stopId === stopId)?.name;

  axios?.post(`/busstops/add?stopId=${stopId}&name=${encodeURI(name!)}`, null, {
      headers: {
        Authorization: 'Bearer ' + localStorage['token']
      }
    }).then(_ => {
      favoriteIds.value.push(stopId);
      fetchFavorites();
    }).catch(err => console.log(err));
}

function deleteFavorite(stopId: number) {
  axios?.delete(`/busstops/favorite?stopId=${stopId}`, {
    headers: {
        Authorization: 'Bearer ' + localStorage['token']
      }
    }).then(_ => {
      const foundId = favoriteIds.value.findIndex(id => id === stopId);
      favoriteIds.value.splice(foundId, 1);
      fetchFavorites();
    }).catch(err => console.log(err));
}

function fetchDepartures(stopId: number) {
  axios?.get(`/busstops/departures?stopId=${stopId}`, {
      headers: {
        Authorization: 'Bearer ' + localStorage['token']
      }
    }).then((res: AxiosResponse<DeparturesResponse>) => {
      console.log('Departures fetched', res.data.delay.length);
      
      departures.value = res.data.delay;
      lastDeparturesUpdate.value = new Date(res.data.lastUpdate);

    }).catch((err) => console.log(err))
      .finally(() => loadingDepartures.value = false);
}

function favoriteChange(stopId: number) {
  if(favoriteIds.value.includes(stopId)){
    deleteFavorite(stopId)
  }
  else {
    addFavorite(stopId);
  }
}

function stopChosen(stop: BusStopItem) {
  console.log('Stop chosen:', stop.stopId);

  chosenStopName.value = stop.name;
  loadingDepartures.value = true;
  fetchDepartures(stop.stopId!);
}
</script>

<template>
  <div class="h-full flex flex-wrap align-items-start align-content-start">

    <div class="m-2 p-3 border-round-md w-24rem bg-mute">
      <div class="text-xl text-center font-bold">Bus Stops</div>

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
        @favorite="favoriteChange($event)"
        @stop-chosen="stopChosen($event)">
      </StopList>

    </div>

    <div class="m-2 p-3 border-round-md w-24rem bg-mute">
      <div class="text-xl text-center font-bold">Favorites</div>

      <StopList 
        :stops="favorites"
        :loading="loadingFav"
        :favorite-ids="favoriteIds"
        @favorite="favoriteChange($event)"
        @stop-chosen="stopChosen($event)">
      </StopList>

    </div>

    <div class="m-2 p-3 border-round-md w-24rem bg-mute">
      <div class="text-xl text-center font-bold">Departures</div>

      <DeparturesTable 
        :stop-name="chosenStopName"
        :last-update="lastDeparturesUpdate"
        :departures="departures"
        :loading="loadingDepartures">
      </DeparturesTable>

    </div>

  </div>
</template>

<style scoped>

</style>