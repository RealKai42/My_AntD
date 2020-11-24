import React, {
  FC,
  ReactElement,
  InputHTMLAttributes,
  ChangeEvent,
} from 'react'
import classNames from 'classnames'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import Icon from '../Icon/icon'

type InputSize = 'lg' | 'sm'
// 因为自己定义的size和html定义的size有冲突，所以使用Omit来移除接口中的值
export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
  /**是否禁用 Input */
  disabled?: boolean
  /**设置 Input 大小，支持 lg 或者是 sm */
  size?: InputSize
  /**设置 Input 内部的 icon */
  icon?: IconProp
  /**设置 Input的前缀内容 */
  prepend?: string | ReactElement
  /**设置 Input的后缀内容 */
  append?: string | ReactElement
  /**设置 Input内容改变时的回调函数 */
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

/**
 * 基础的输入组件，支持所有原生 Input 组件的属性和事件
 *
 */
export const Input: FC<InputProps> = (props) => {
  const { disabled, size, icon, prepend, append, style, ...restProps } = props
  const cnames = classNames('input-wrapper', {
    [`input-size-${size}`]: size,
    'is-disabled': disabled,
    'input-group': prepend || append,
    'input-group-append': !!append,
    'input-group-prepend': !!prepend,
  })

  const fixControlledValue = (value: any) => {
    if (typeof value === 'undefined' || value === null) {
      return ''
    }
    return value
  }

  if ('value' in props) {
    // 对受控组件进行处理, 删除默认值，并对undefined和null进行处理
    delete restProps.defaultValue
    restProps.value = fixControlledValue(props.value)
  }

  return (
    <div className={cnames} style={style}>
      {prepend && <div className="input-group-prepend">{prepend}</div>}
      {icon && (
        <div className="icon-wrapper">
          <Icon icon={icon} title={`title-${icon}`} />
        </div>
      )}
      <input className="input-inner" disabled={disabled} {...restProps} />
      {append && <div className="input-group-append">{append}</div>}
    </div>
  )
}

export default Input
