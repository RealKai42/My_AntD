import React from 'react'
import { fireEvent, render, RenderResult } from '@testing-library/react'
import { Icon, IconProps } from './icon'

const testProps: IconProps = {
  icon: 'times',
  theme: 'light',
  onClick: jest.fn(),
}

let wrapper: RenderResult, icon: HTMLElement
describe('test icon component', () => {
  beforeEach(() => {
    wrapper = render(<Icon {...testProps} />)
    icon = wrapper.getByTestId('test-icon')
  })
  it('should render the correct icon', () => {
    expect(icon).toBeInTheDocument()
    expect(icon.getAttribute('data-icon')).toEqual('times')
  })
  it('should render the correct theme', () => {
    expect(icon).toHaveClass('icon-light')
  })
  it('should respond to click', () => {
    fireEvent.click(icon)
    expect(testProps.onClick).toHaveBeenCalled()
  })
})
