import { mount } from '@vue/test-utils';
import Element2 from '../../src/components/element2.vue';

describe('Element2', () => {
  it('should show JSON data in dialog when showJson is called',  () => {
    const wrapper = mount(Element2);
    const jsonData = { a: 1, b: 2 };

     wrapper.vm.showJson(jsonData);

    expect(wrapper.vm.dialogVisible).toBe(true);
    expect(wrapper.vm.dialogData).toBe(JSON.stringify(jsonData, null, 2));
  });
});