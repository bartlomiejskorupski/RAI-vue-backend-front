import { defineStore } from "pinia";

export const useUserStore = defineStore('user', {

  state: () => {
    return {
      token: null as string | null
    }
  },

  getters: {

    authHeader: (state) => {
      return {
        'Authorization': `Bearer ${state.token}`
      }
    },

    isLoggedIn: (state) => {
      return state.token !== null;
    },

  },

  actions: {
    
    login(token: string) {
      this.token = token;
    },

    logout() {
      this.token = null;
    }

  }

});