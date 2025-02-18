import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import DataForge from '../DataForgeGen.vue'

describe('DataForge', () => {
  it('renders properly', () => {
    const wrapper = mount(DataForge)
    expect(wrapper.text()).toContain('Insert your JSON schema to generate your data')
  })
})
