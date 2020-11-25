import React from 'react'
import { render } from '@testing-library/react'
import { Progress, ProgressProps } from './progress'

const defaultProps: ProgressProps = {
  precent: 20,
  strokeHight: 30,
  showText: true,
  theme: 'light',
}

describe('test Progress component', () => {
  it('should render the correct progress', () => {
    const wrapper = render(<Progress {...defaultProps} />)
    const progreseText = wrapper.getByText(`${defaultProps.precent}%`)
    expect(progreseText).not.toBeNull()
    expect(progreseText.parentElement).toHaveClass(
      `color-${defaultProps.theme}`
    )
    expect(progreseText.parentElement).toHaveStyle(
      `width:${defaultProps.precent}%`
    )
    expect(progreseText.parentElement!.parentElement).toHaveStyle(
      `height:${defaultProps.strokeHight}px`
    )
  })

  it('should not render text when showText is false', () => {
    const wrapper = render(<Progress {...defaultProps} showText={false} />)
    const progreseText = wrapper.queryByText(`${defaultProps.precent}%`)
    expect(progreseText).toBeNull()
  })

  it('should have the customized style when styles is setted', () => {
    const customizedStyle = { width: '100px' }
    const wrapper = render(
      <Progress {...defaultProps} styles={customizedStyle} />
    )
    const outer = wrapper.getByTestId('test-progress')
    expect(outer).toHaveStyle(customizedStyle)
  })
})
