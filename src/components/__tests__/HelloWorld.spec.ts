import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import HowToUse from '../HowToUse.vue'

describe('How to use', () => {
  it('renders properly', () => {
    const wrapper = mount(HowToUse)
    expect(wrapper.text()).toContain('How to use:')
  })
})
