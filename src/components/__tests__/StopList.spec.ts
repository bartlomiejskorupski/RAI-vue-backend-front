import { describe, expect, it } from "vitest";
import StopListVue from "../StopList.vue";
import { setupHelper } from "./helpers";
import { mount } from "@vue/test-utils";
import AppVue from "@/App.vue";

const setup = setupHelper(StopListVue);

describe('StopList', () => {

  describe('isFavorite', () => {

    it('should return 🖤 if stopId is not in favorites', () => {
      const wrapper = setup({ stops: [], favoriteIds: [1, 2] });

      const favChar = wrapper.vm.isFavorite(3);

      expect(favChar).to.equal('🖤');
    });

    it('should return 💛 if stopId is in favorites', () => {
      const wrapper = setup({ stops: [], favoriteIds: [1, 2] });

      const favChar = wrapper.vm.isFavorite(1);

      expect(favChar).to.equal('💛');
    });

  });

  describe('computed filteredStops', () => {

    it('should not filter if not present', () => {
      const wrapper = setup({ stops: [{name: 'stop1'}, {name: 'stop2'}] });

      const filtered = wrapper.vm.filteredStops;

      expect(filtered).to.deep.equal([{name: 'stop1'}, {name: 'stop2'}]);
    });

    it('should filter if present', () => {
      const wrapper = setup({ filter: 'op1', stops: [{name: 'stop1'}, {name: 'stop'}] });

      const filtered = wrapper.vm.filteredStops;

      expect(filtered).to.deep.equal([{name: 'stop1'}]);
    });

  });

  describe('loading property', () => {

    it('should only display loading if true', () => {
      const wrapper = setup({ stops: [{stopId: 1, name: 'stop1'}], loading: true });

      expect(wrapper.text()).to.contain('Loading...');
      expect(wrapper.text()).to.not.contain('stop1');
    });

    it('should display stops if false', () => {
      const wrapper = setup({ stops: [{stopId: 1, name: 'stop1'}], loading: false });

      expect(wrapper.text()).to.not.contain('Loading...');
      expect(wrapper.text()).to.contain('stop1');
    });

  });

  describe('when stop is clicked', () => {

    it('should emit stop-chosen event', () => {
      const stop1 = {stopId: 123, name: 'stop1'};
      const wrapper = setup({ stops: [stop1], loading: false });

      wrapper.vm.$emit('stop-chosen', stop1);

      expect(wrapper.emitted()['stop-chosen'].length).to.equal(1);
      expect(wrapper.emitted()['stop-chosen'][0]).to.deep.equal([stop1]);
    });

  });

  describe('when favorite is clicked', () => {

    it('should emit favorite event', () => {
      const stop1 = {stopId: 123, name: 'stop1'};
      const wrapper = setup({ stops: [stop1], loading: false });

      wrapper.vm.$emit('favorite', stop1.stopId);

      expect(wrapper.emitted()['favorite'].length).to.equal(1);
      expect(wrapper.emitted()['favorite'][0]).to.deep.equal([123]);
    });

  });

  describe('stops property is empty', () => {

    it('should render Empty...', () => {
      const wrapper = setup({ stops: [] });

      expect(wrapper.text().toLocaleLowerCase()).to.contain('empty...');
    });

  });

  describe('stops property is empty and loading', () => {

    it('should render Loading...', () => {
      const wrapper = setup({ stops: [], loading: true });

      expect(wrapper.text().toLocaleLowerCase()).to.contain('loading...');
    });

  });

});
