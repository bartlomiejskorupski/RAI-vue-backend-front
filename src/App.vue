<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useUserStore } from './data/user.store';

const router = useRouter();
const userStore = useUserStore();

function logoutClick() {
  userStore.logout()
  router.push('/');
}
</script>

<template>
  <div class="flex flex-column h-full">

    <div class="flex-none bg-heading flex justify-content-between align-items-center">

      <div class="p-2 text-3xl select-none">ZTM 🚍</div>

      <button
        v-if="userStore.isLoggedIn" 
        class="logout-button" 
        @click="logoutClick">
        Logout
      </button>

    </div>

    <div class="flex-grow-1">
      <router-view/>
    </div>

  </div>
</template>

<style scoped>
.logout-button {
  padding: .5rem 1rem;
  margin: 0 .5rem;
  background: var(--color-background-mute);
  color: var(--color-text);
  border: 1px solid black;
  border-radius: 5px;
}

.logout-button:hover {
  background: var(--color-background-soft);
}
</style>
