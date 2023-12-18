import CapitalizePlugin from "@/plugins/capitalize-plugin";
import { mount } from "@vue/test-utils";
import type { Component } from "vue";

export const setupHelper = (component: Component) => (properties: any) => {
  return mount(component, {
    props: properties,
    global: {  plugins: [CapitalizePlugin] }
  });
};