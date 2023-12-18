import AppVue from "@/App.vue";
import CapitalizePlugin from "@/plugins/capitalize-plugin";
import { describe, expect, it } from "vitest";
import { createApp } from "vue";

const setup = (firstWordOnly: boolean) => {
  const app = createApp(AppVue);
  app.use(CapitalizePlugin, { firstWordOnly });
  return app;
};

describe('CapitalizePlugin', () => {

  describe('when firstWordOnly is true', () => {

    it('should only capitalize first letter of first word', () => {
      const app = setup(true);

      const capitalized = app.config.globalProperties.$capitalize('some text here');

      expect(capitalized).to.equal('Some text here');
    });

  });

  describe('when firstWordOnly is false', () => {

    it('should capitalize first letters of all words', () => {
      const app = setup(false);

      const capitalized = app.config.globalProperties.$capitalize('some text here');

      expect(capitalized).to.equal('Some Text Here');
    });

  });

});
