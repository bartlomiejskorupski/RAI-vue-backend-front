<script setup lang="ts">
import { ref, computed, inject } from 'vue';
import CustomInput from './CustomInput.vue';
import { useRouter } from 'vue-router';
import type { AxiosError, AxiosResponse, AxiosStatic } from 'axios';

type AuthMode = 'login' | 'register';

type AuthRequest = {login: string, password: string};
type MessageResponse = { message: string };
type LoginResponse = { token: string };

const router = useRouter();
const axios = inject<AxiosStatic>('axios');

const mode = ref<AuthMode>('login');

const credentials = ref({
  login: "",
  password: ""
});

const message = ref<string>();
const messageIsError = ref<boolean>(false);

const authHeader = computed(() => mode.value === 'login' ? 'Login' : 'Register');
const submitText = computed(() => mode.value === 'login' ? 'Sign in' : 'Sign up');
const bottomText = computed(() => {
  if(mode.value === 'login') {
    return { text: "Don't have an account?", linkText: 'Register' };
  }
  else {
    return { text: "Already have an account?", linkText: 'Login' };
  }
});

function toggleMode() {
  mode.value = mode.value === 'login' ? 'register' : 'login';
  credentials.value.login = '';
  credentials.value.password = '';
}

function submitClick() {
  if(mode.value === 'login'){
    login();
  }
  else {
    register();
  }
}

function register() {
  const request: AuthRequest = {
    login: credentials.value.login,
    password: credentials.value.password
  };

  axios?.post(
    '/auth/register', request
  ).then((res: AxiosResponse<MessageResponse>) => {
    console.log(res.data.message);
    message.value = res.data.message;
    messageIsError.value = false;
    toggleMode();
  }).catch((err: AxiosError<MessageResponse>) => {
    console.log(err.response?.data);
    message.value = err.response?.data.message;
    messageIsError.value = true;
  });
}

function login() {
  axios?.post('/auth/login', {
    login: credentials.value.login,
    password: credentials.value.password
  }).then((res: AxiosResponse<LoginResponse>) => {
    console.log(res.data);
    message.value = '';
    messageIsError.value = false;
  }).catch((err: AxiosError<MessageResponse>) => {
    console.log(err?.response?.data);
    message.value = err.response?.data.message;
    messageIsError.value = true;
  });
}
</script>

<template>
  <div class="h-full flex justify-content-center align-items-center">
    <div class="py-2 px-4 border-round-md bg-soft w-18rem">

      <div class="text-center text-2xl">
        {{ authHeader }}
      </div>

      <form class="flex flex-column">
        <div :class="['msg', messageIsError ? 'error' : '']"
          v-show="!!message">
          {{ message }}
        </div>

        <CustomInput name="Login"
          v-model="credentials.login"
          placeholder="Enter login...">
        </CustomInput>

        <CustomInput name="Password"
          v-model="credentials.password"
          placeholder="Enter password..."
          :password="true">
        </CustomInput>

        <button type="button"
          class="mt-3 bg-heading text-white p-2 border-1 border-white border-round-sm"
          @click="submitClick">
          {{ submitText }}
        </button>

        <div class="text-xs mt-2">
          {{ bottomText.text }}

          <a class="link" @click="toggleMode">{{ bottomText.linkText }}</a>
        </div>

      </form>
    </div>
  </div>
</template>

<style scoped>
.link {
  color: rgb(0, 69, 166);
  cursor: pointer;
}

.msg {
  background: rgb(22, 82, 22);
  color: rgb(216, 216, 216);
  margin: .2rem;
  padding: .3rem;
  border: 0px;
  border-radius: .2rem;
  font-size: smaller;
}

.msg.error {
  background: #6a3030;
}

</style>