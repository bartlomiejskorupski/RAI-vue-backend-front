import { describe, expect, it, test } from "vitest";
import CustomInputVue from "../CustomInput.vue";
import { setupHelper } from "./helpers";

const setup = setupHelper(CustomInputVue);

describe('CustomInput', () => {

  it('should create', () => {
    const wrapper = setup({modelValue: '', name: 'name'});
    
    expect(wrapper).to.exist;
  });

  describe('show-label property', () => {

    describe('when true', () => {

      it('should show the label', () => {
        const wrapper = setup({modelValue: '', name: 'name', showLabel: true});
  
        const label = wrapper.element.querySelector('label');
        const labelForAttr = label?.attributes.getNamedItem('for')?.value;
        expect(labelForAttr).to.equal('name');
      });
  
      it('label text should be capitalized', () => {
        const wrapper = setup({modelValue: '', name: 'password', showLabel: true});
        
        const label = wrapper.element.querySelector('label');
  
        expect(label?.innerHTML).to.equal('Password');
      });

    });

    test('when false, should not add the label', () => {
      const wrapper = setup({modelValue: '', name: 'name', showLabel: false});

      const label = wrapper.element.querySelector('label');

      expect(label).to.not.exist;
    });

    test('when not set, should not add the label', () => {
      const wrapper = setup({modelValue: '', name: 'name', showLabel: false});

      const label = wrapper.element.querySelector('label');

      expect(label).to.not.exist;
    });

  });

  describe('password property', () => {

    test('when true, input should be of type password', () => {
      const wrapper = setup({modelValue: '', name: 'name', password: true});

      const input = wrapper.element.querySelector('input');
      
      expect(input?.type).to.equal('password');
    });

    test('when false, input should be of type text', () => {
      const wrapper = setup({modelValue: '', name: 'name', password: false});

      const input = wrapper.element.querySelector('input');
      
      expect(input?.type).to.equal('text');
    });

    test('when undefined, input should be of type text', () => {
      const wrapper = setup({modelValue: '', name: 'name'});

      const input = wrapper.element.querySelector('input');
      
      expect(input?.type).to.equal('text');
    });

  });

  describe('placeholder property', () => {

    test('when set, should show placeholder text', () => {
      const wrapper = setup({modelValue: '', name: 'name', placeholder: 'Test placeholder...'});

      const input = wrapper.element.querySelector('input');
      
      expect(input?.placeholder).to.equal('Test placeholder...');
    });

    test('when not set, should not show placeholder', () => {
      const wrapper = setup({modelValue: '', name: 'name'});

      const input = wrapper.element.querySelector('input');
      
      expect(input?.placeholder).to.be.empty;
    });

  });

  it('should emit modelValue update events', () => {
    const wrapper = setup({modelValue: '', name: 'name'});

    wrapper.vm.$emit('update:modelValue', 'b');
    wrapper.vm.$emit('update:modelValue', 'ba');
    wrapper.vm.$emit('update:modelValue', 'bar');
    wrapper.vm.$emit('update:modelValue', 'bart');

    expect(wrapper.emitted()['update:modelValue'].length).to.equal(4);
    expect(wrapper.emitted()['update:modelValue'][3]).to.deep.equal(['bart']);
  });

});
