import React, { FC, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react'
import classNames from 'classnames'

export type ButtonSize = 'lg' | 'sm'
export type ButtonType = 'default' | 'primary' | 'danger' | 'link'

interface BaseButtonProps {
  /**用户自定义的 className */
  className?: string
  /**设置 Button 的禁用 */
  disabled?: boolean
  /**设置 Button 的尺寸 */
  size?: ButtonSize
  /**设置 Button 的类型 */
  btnType?: ButtonType
  /**Button内置文本 */
  label: string
  children: React.ReactNode
  href?: string
}
// 获取所有原生button的属性，与组件库的类型取并集
type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>
// 获取原生link的属性
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>
// 通过ts内置的partial函数，将所有属性转换成可选的
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>

/**
 * 页面中最常用的的按钮元素，适合于完成特定的交互
 *
 */
export const Button: FC<ButtonProps> = (props) => {
  const {
    btnType,
    disabled,
    className,
    size,
    children,
    href,
    label,
    ...restProps
  } = props

  // 默认有btn，根据属性生成类名。可以查classnames的文档
  const classes = classNames('btn', className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    // 判断是否是link元素，link元素没有disable的属性，所以要在classes上体现
    disabled: btnType === 'link' && disabled,
  })

  // label与children二选一
  const content = label ? label : children

  if (btnType === 'link' && href) {
    return (
      <a className={classes} href={href} {...restProps}>
        {content}
      </a>
    )
  } else {
    return (
      <button className={classes} disabled={disabled} {...restProps}>
        {content}
      </button>
    )
  }
}

Button.defaultProps = {
  disabled: false,
  btnType: 'default',
}

export default Button
