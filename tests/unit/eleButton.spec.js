/* eslint-env jest */
import { mount } from '@vue/test-utils'
import eleButton from '../../src/components/eleButton.vue'

describe('eleButton.vue', () => {
//   测试组件上一个element-ui的button的文字是否为sozra
    it('renders sozra', () => {
        const wrapper = mount(eleButton)
        expect(wrapper.text()).toMatch('sozra')
    })
    // 测试组件上一个element-ui的button的类型是否为info
    it('has type info', () => {
        const wrapper = mount(eleButton)
        expect(wrapper.classes()).toContain('el-button--info')
    })
})