import React from 'react'
import classNames from 'classnames'
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from '@fortawesome/react-fontawesome'

export type ThemeProps =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'info'
  | 'warning'
  | 'danger'
  | 'light'
  | 'dark'

// 借助font awesome来定义自己的 IconProps
export interface IconProps extends FontAwesomeIconProps {
  /**设置显示图标的主题 */
  theme?: ThemeProps
}

// 对font awesome进行二层封装
/**
 * Icon 组件为对 font awesome 的二次封装，图标覆盖其中 **Free&Solid** 部分
 *
 */
export const Icon: React.FC<IconProps> = (props) => {
  const { className, theme, ...resetProps } = props
  const classes = classNames('icon', className, {
    [`icon-${theme}`]: theme,
  })
  return (
    <FontAwesomeIcon
      className={classes}
      {...resetProps}
      data-testid="test-icon"
    />
  )
}

Icon.defaultProps = {
  icon: 'apple',
  theme: 'default',
}

export default Icon
