/// <reference types="vite/client" />

export {}

declare module 'vue' {
  interface ComponentCustomProperties {
    test: string;
    $filters: {
      capitalize: (value: string) => string;
    };
  }
}