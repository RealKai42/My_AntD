import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Alert, { AlertType, AlertProps } from './alert'

const defaultProps: AlertProps = {
  title: 'testTitle',
  description: 'testDesc',
  type: AlertType.default,
  closable: true,
  onClose: jest.fn(),
}
const dangerProps: AlertProps = {
  title: 'testTitle',
  type: AlertType.danger,
}
const unClosableProps: AlertProps = {
  title: 'testTitle',
  closable: false,
}
describe('test alert component', () => {
  it('should render the correct default alert', () => {
    const wrapper = render(<Alert {...defaultProps} />)
    const title = wrapper.getByText(defaultProps.title)
    expect(title.tagName).toEqual('H4')
    expect(title).toHaveClass('alert-title')

    const desc = wrapper.getByText(defaultProps.description as string)
    expect(desc.tagName).toEqual('P')
    expect(desc).toHaveClass('alert-message')

    const close = wrapper.getByText('关闭')
    expect(close.tagName).toEqual('I')
    fireEvent.click(close)
    expect(defaultProps.onClose).toHaveBeenCalled()
  })
  it('should render the correct component based on different props', () => {
    const wrapper = render(<Alert {...dangerProps} />)
    const title = wrapper.getByText(defaultProps.title)
    const div = title.parentNode
    expect(div).toHaveClass('alert-danger')
  })
  it('should not render the close button while closable set to true', () => {
    const wrapper = render(<Alert {...unClosableProps} />)
    const close = wrapper.queryByText('关闭')
    expect(close).toBeNull()
  })
})
