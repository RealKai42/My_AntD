import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Button, { ButtonProps } from './button'

const defaultProps = {
  // 使用mock function来捕获函数的调用
  onClick: jest.fn(),
}
const testProps: ButtonProps = {
  btnType: 'primary',
  size: 'lg',
  className: 'testClassName',
}
const disabledProps: ButtonProps = {
  disabled: true,
  onClick: jest.fn(),
}
describe('test Button component', () => {
  // it等价于test
  it('should render the correct default button', () => {
    // render方法将Button渲染到真实的dom节点上
    const wrapper = render(<Button {...defaultProps}>Test</Button>)
    const element = wrapper.getByText('Test') as HTMLButtonElement
    expect(element).toBeInTheDocument()
    // 注意tagName都是大写的
    expect(element.tagName).toEqual('BUTTON')
    expect(element).toHaveClass('btn btn-default')
    expect(element.disabled).toBeFalsy()
    // 使用fireEvent来触发事件
    fireEvent.click(element)
    expect(defaultProps.onClick).toHaveBeenCalled()
  })
  it('should render the correct component based on different props', () => {
    const wrapper = render(<Button {...testProps}>Test</Button>)
    const element = wrapper.getByText('Test')
    expect(element).toBeInTheDocument()
    expect(element).toHaveClass('btn-primary btn-lg ' + testProps.className)
  })
  it('should render a link when btnType equals link and hred is provided', () => {
    const wrapper = render(
      <Button btnType="link" href="http://dummyurl.com">
        Link
      </Button>
    )
    const element = wrapper.getByText('Link')
    expect(element.tagName).toEqual('A')
    expect(element).toHaveClass('btn btn-link')
  })
  it('should render disabled button when disabled set to true', () => {
    const wrapper = render(<Button {...disabledProps}>Test</Button>)
    const element = wrapper.getByText('Test') as HTMLButtonElement
    expect(element).toBeInTheDocument()
    expect(element.disabled).toBeTruthy()
    fireEvent.click(element)
    expect(disabledProps.onClick).not.toHaveBeenCalled()
  })
})
