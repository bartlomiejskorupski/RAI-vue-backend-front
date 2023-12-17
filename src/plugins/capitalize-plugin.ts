import type { App, Plugin } from "vue";

export interface CapitalizePluginOptions {
  firstWordOnly?: boolean;
}

const capitalize = (text: string): string => {
  return text.split(' ')
  .map(word => word.charAt(0).toLocaleUpperCase() + word.slice(1))
  .join(' ');
};

const capitalizeFirstWordOnly = (text: string): string => {
  return text.split(' ')
  .map((word, index) => {
    if(index == 0) {
      return word.charAt(0).toLocaleUpperCase() + word.slice(1)
    }
    else {
      return word;
    }
  }).join(' ');
};

const CapitalizePlugin: Plugin<[CapitalizePluginOptions?]> = {
  install: (app: App, options?: CapitalizePluginOptions) => {

    if(options?.firstWordOnly) {
      app.config.globalProperties.$capitalize = capitalizeFirstWordOnly;
    }
    else {
      app.config.globalProperties.$capitalize = capitalize;
    }

  }
};

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $capitalize: (text: string) => string;
  }
}

export default CapitalizePlugin;